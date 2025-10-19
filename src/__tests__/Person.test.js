import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Person from "../views/Person.vue";

let mockStore = null;

vi.mock("../stores/person", () => ({
  usePersonStore: () => mockStore,
}));

describe("Person.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore = {
      isLoading: false,
      getPersonData: { results: [] },
      getPersonAction: vi.fn(),
      getPopularPersons: vi.fn(),
    };
  });

  it("calls getPopularPersons on mount", () => {
    mount(Person, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          Loader: { template: "<div data-test-loader />" },
          "router-link": true,
        },
      },
    });
    expect(mockStore.getPopularPersons).toHaveBeenCalled();
  });

  it("renders search input and Search button", () => {
    const wrapper = mount(Person, {
      global: {
        stubs: { FontAwesomeIcon: true, Loader: true, "router-link": true },
      },
    });
    const input = wrapper.find('input[placeholder="Search for a person..."]');
    expect(input.exists()).toBe(true);
    const searchBtn = wrapper
      .findAll("button")
      .find((b) => b.text().includes("Search"));
    expect(searchBtn).toBeTruthy();
  });

  it("shows Loader when store is loading", () => {
    mockStore.isLoading = true;
    const wrapper = mount(Person, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          Loader: { template: "<div data-test-loader />" },
          "router-link": true,
        },
      },
    });
    expect(wrapper.find("[data-test-loader]").exists()).toBe(true);
  });

  it("renders person cards including image fallback", async () => {
    mockStore.getPersonData = {
      results: [
        {
          id: 1,
          name: "Alice",
          profile_path: "/alice.jpg",
          known_for_department: "Acting",
        },
        {
          id: 2,
          name: "Bob",
          profile_path: null,
          known_for_department: "Directing",
        },
      ],
    };

    const wrapper = mount(Person, {
      global: {
        stubs: { FontAwesomeIcon: true, Loader: true, "router-link": true },
      },
    });

    // two card titles
    const titles = wrapper.findAll(".card-title").map((n) => n.text());
    expect(titles).toEqual(expect.arrayContaining(["Alice", "Bob"]));

    // image present for first person
    const imgs = wrapper.findAll("img");
    expect(imgs.length).toBeGreaterThanOrEqual(1);
    expect(imgs[0].attributes("src")).toContain("/alice.jpg");

    // fallback text for second person
    const fallback = wrapper
      .findAll(".card-img-top")
      .find((node) => node.text().includes("Image not available"));
    expect(fallback).toBeTruthy();
  });

  it("search button triggers getPersonAction with query", async () => {
    const wrapper = mount(Person, {
      global: {
        stubs: { FontAwesomeIcon: true, Loader: true, "router-link": true },
      },
    });

    const input = wrapper.find('input[placeholder="Search for a person..."]');
    await input.setValue("Keanu");
    const searchBtn = wrapper
      .findAll("button")
      .find((b) => b.text().includes("Search"));
    await searchBtn.trigger("click");

    expect(mockStore.getPersonAction).toHaveBeenCalledWith("Keanu");
  });

  it("pagination next/previous call store and previous disabled on first page", async () => {
    const wrapper = mount(Person, {
      global: {
        stubs: { FontAwesomeIcon: true, Loader: true, "router-link": true },
      },
    });

    const prevBtn = wrapper
      .findAll("button")
      .find((b) => b.text().includes("Previous"));
    const nextBtn = wrapper
      .findAll("button")
      .find((b) => b.text().includes("Next"));

    // previous disabled initially
    expect(prevBtn.attributes("disabled")).toBeDefined();

    // click next -> page should increment and call getPopularPersons with page 2
    await nextBtn.trigger("click");
    expect(mockStore.getPopularPersons).toHaveBeenCalledWith(2);

    // click previous -> should call with page 1
    await prevBtn.trigger("click");
    expect(mockStore.getPopularPersons).toHaveBeenCalledWith(1);
  });
});

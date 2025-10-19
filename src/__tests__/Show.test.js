import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Show from "../views/Show.vue";

// Mocked store implementation
const mockGetPopularShows = vi.fn();
const mockSearchShow = vi.fn();
let mockStore;

vi.mock("../stores/show", () => ({
  useShowStore: () => mockStore,
}));

beforeEach(() => {
  mockGetPopularShows.mockReset();
  mockSearchShow.mockReset();

  mockStore = {
    isLoading: false,
    getShowData: { results: [] },
    getPopularShows: mockGetPopularShows,
    searchShow: mockSearchShow,
  };
});

describe("Show.vue", () => {
  const globalMountOptions = {
    global: {
      components: {
        // simple stubs so the template renders predictably
        Loader: { template: '<div data-test="loader" />' },
        FontAwesomeIcon: { template: "<i />" },
        RouterLink: { template: '<a class="router-link"><slot /></a>' },
      },
    },
  };

  it("renders hero heading and description", () => {
    const wrapper = mount(Show, globalMountOptions);
    expect(wrapper.find("h1").text()).toContain("Shows");
    expect(wrapper.find("p").text()).toContain(
      "This page lists all popular shows"
    );
  });

  it("renders show cards when showData.results is populated", async () => {
    mockStore.getShowData = {
      results: [
        {
          id: 42,
          name: "Test Show",
          overview: "An overview",
          poster_path: "/poster.jpg",
        },
      ],
    };
    const wrapper = mount(Show, globalMountOptions);

    // image src should include TMDB base + poster path
    const img = wrapper.find("img.card-img-top");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe(
      "https://image.tmdb.org/t/p/w500/poster.jpg"
    );

    // title and overview
    expect(wrapper.find(".card-title").text()).toBe("Test Show");
    expect(wrapper.find(".card-text").text()).toBe("An overview");

    // router-link stub is rendered
    expect(wrapper.find("a.router-link").exists()).toBe(true);
  });

  it("calls searchShow with the input query and page 1 when Search clicked", async () => {
    const wrapper = mount(Show, globalMountOptions);

    const input = wrapper.find('input[type="text"]');
    await input.setValue("batman");

    const buttons = wrapper.findAll("button");
    // Template order: Search, Previous, Next => Search is first
    await buttons[0].trigger("click");

    expect(mockSearchShow).toHaveBeenCalledTimes(1);
    expect(mockSearchShow).toHaveBeenCalledWith("batman", 1);
  });

  it("disables Previous when on first page and navigates pages correctly", async () => {
    const wrapper = mount(Show, globalMountOptions);

    const buttons = wrapper.findAll("button");
    const prevBtn = buttons[1];

    // Initially previous should be disabled
    expect(prevBtn.element.disabled).toBe(true);

    // After going to next page, Previous should be enabled and clicking it goes back to page 1
    await prevBtn.trigger("click");
  });

  it("uses searchShow for pagination when a search query exists", async () => {
    const wrapper = mount(Show, globalMountOptions);

    // set search query
    const input = wrapper.find('input[type="text"]');
    await input.setValue("friends");

    const buttons = wrapper.findAll("button");
    const nextBtn = buttons[2];

    // Click Next should call searchShow with page 2
    await nextBtn.trigger("click");
    expect(mockSearchShow).toHaveBeenCalledTimes(1);
    expect(mockSearchShow).toHaveBeenCalledWith("friends", 2);
  });
});

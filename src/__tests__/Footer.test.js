import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { ref } from "vue";
import Footer from "../components/Footer.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTwitter,
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

describe("Footer.vue", () => {
  it("renders footer content correctly", () => {
    const wrapper = mount(Footer, {
      global: {
        components: { FontAwesomeIcon },
      },
    });

    expect(wrapper.find(".footer").exists()).toBe(true);
    expect(wrapper.find(".features").exists()).toBe(true);
    expect(wrapper.find(".footer-social").exists()).toBe(true);
    expect(wrapper.text()).toContain("Movies");
    expect(wrapper.text()).toContain("People");
    expect(wrapper.text()).toContain("Shows");
  });

  it("displays the current year", () => {
    const wrapper = mount(Footer, {
      global: {
        components: { FontAwesomeIcon },
      },
    });

    const currentYear = new Date().getFullYear();
    expect(wrapper.text()).toContain(
      `© ${currentYear} Vue Movies App. All rights reserved.`
    );
  });

  it("renders social media icons with correct links", () => {
    const wrapper = mount(Footer, {
      global: {
        components: { FontAwesomeIcon },
      },
    });

    const links = wrapper.findAll(".footer-social a");
    expect(links[0].attributes("href")).toBe("https://twitter.com");
    expect(links[1].attributes("href")).toBe("https://facebook.com");
    expect(links[2].attributes("href")).toBe("https://youtube.com");
    expect(links[3].attributes("href")).toBe("https://youtube.com");
  });

  it("renders FontAwesome icons correctly", () => {
    const wrapper = mount(Footer, {
      global: {
        components: { FontAwesomeIcon },
      },
    });

    const icons = wrapper.findAllComponents(FontAwesomeIcon);
    expect(icons).toHaveLength(4);
    expect(icons[0].props("icon")).toBe(faTwitter);
    expect(icons[1].props("icon")).toBe(faFacebook);
    expect(icons[2].props("icon")).toBe(faYoutube);
    expect(icons[3].props("icon")).toBe(faInstagram);
  });
});
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTwitter,
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const currentYear = ref(new Date().getFullYear());

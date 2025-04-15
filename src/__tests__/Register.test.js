import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Register from "../views/Register.vue";

describe("Register Component", () => {
    it("renders the registration form", () => {
        const wrapper = mount(Register);
        expect(wrapper.find("h2").text()).toBe("Register");
        expect(wrapper.find("form").exists()).toBe(true);
        expect(wrapper.find("#email").exists()).toBe(true);
        expect(wrapper.find("#username").exists()).toBe(true);
        expect(wrapper.find("#password").exists()).toBe(true);
        expect(wrapper.find("button[type='submit']").text()).toBe("Register");
    });

    it("shows an alert if fields are empty on submit", async () => {
        const wrapper = mount(Register);
        window.alert = vi.fn(); // Mock alert
        await wrapper.find("form").trigger("submit.prevent");
        expect(window.alert).toHaveBeenCalledWith("Please fill in all fields.");
    });

    it("logs form data when all fields are filled", async () => {
        const wrapper = mount(Register);
        const consoleSpy = vi.spyOn(console, "log");

        await wrapper.find("#email").setValue("test@example.com");
        await wrapper.find("#username").setValue("testuser");
        await wrapper.find("#password").setValue("password123");
        await wrapper.find("form").trigger("submit.prevent");

        expect(consoleSpy).toHaveBeenCalledWith("Email:", "test@example.com");
        expect(consoleSpy).toHaveBeenCalledWith("Username:", "testuser");
        expect(consoleSpy).toHaveBeenCalledWith("Password:", "password123");

        consoleSpy.mockRestore();
    });

    it("displays the card with animation on mount", () => {
        const wrapper = mount(Register);
        expect(wrapper.vm.showCard).toBe(true);
        expect(wrapper.find(".card").isVisible()).toBe(true);
    });

    it("contains navigation links", () => {
        const wrapper = mount(Register);
        expect(wrapper.find("router-link[to='/login']").exists()).toBe(true);
        expect(wrapper.find("router-link[to='/']").exists()).toBe(true);
    });
});

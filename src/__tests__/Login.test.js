import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Login from "../views/Login.vue";

describe("Login.vue", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Login);
    });

    it("renders the login card", () => {
        expect(wrapper.find(".card").exists()).toBe(true);
    });

    it("shows the login card on mount", async () => {
        expect(wrapper.vm.showLoginCard).toBe(true);
    });

    it("renders email and password input fields", () => {
        expect(wrapper.find("#email").exists()).toBe(true);
        expect(wrapper.find("#password").exists()).toBe(true);
    });

    it("renders the login button", () => {
        const button = wrapper.find("button[type='submit']");
        expect(button.exists()).toBe(true);
        expect(button.text()).toBe("Login");
    });

    it("validates form submission with empty fields", async () => {
        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
        await wrapper.find("form").trigger("submit.prevent");
        expect(alertMock).toHaveBeenCalledWith("Please fill in all fields.");
        alertMock.mockRestore();
    });

    it("logs email and password on valid form submission", async () => {
        const consoleLogMock = vi.spyOn(console, "log").mockImplementation(() => {});
        await wrapper.find("#email").setValue("test@example.com");
        await wrapper.find("#password").setValue("password123");
        await wrapper.find("form").trigger("submit.prevent");

        expect(consoleLogMock).toHaveBeenCalledWith("Email:", "test@example.com");
        expect(consoleLogMock).toHaveBeenCalledWith("Password:", "password123");
        consoleLogMock.mockRestore();
    });

    // it("renders links to register and home", () => {
    //     const registerLink = wrapper.find("a[href='/register']");
    //     const homeLink = wrapper.find("a[href='/']");
    //     expect(registerLink.text()).toBe("Register");
    //     expect(homeLink.exists()).toBe(true);
    //     expect(homeLink.text()).toBe("Back to Home");
    // });
});

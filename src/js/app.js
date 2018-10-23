import netlifyIdentity from "netlify-identity-widget";

const GoTrueAPIUrl = window.GotrueAPI;

const initIdentity = (APIUrl, commerce) => {
  if (commerce) {
    netlifyIdentity.on("init", (user) => {
      if (!user) {
        return;
      }

      commerce.setUser(user);
    });
    netlifyIdentity.on("login", (user) => commerce.setUser(user));
    netlifyIdentity.on("logout", () => commerce.setUser(null));
  }

  netlifyIdentity.init({APIUrl});
};

const init = () => initIdentity(GoTrueAPIUrl, "netlifyGocommerce" in window ? netlifyGocommerce.store.gocommerce : null);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

let _supabase = null;

function getSupabaseClient() {
    if (_supabase) return _supabase;

    const config = window.__HERLY_CONFIG__ || {};
    const { SUPABASE_URL, SUPABASE_ANON_KEY } = config;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY ||
        SUPABASE_URL === "YOUR_SUPABASE_URL" ||
        SUPABASE_ANON_KEY === "YOUR_SUPABASE_ANON_KEY") {
        throw new Error("Supabase credentials are not configured. Update config.js with your real URL and anon key.");
    }

    _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return _supabase;
}

//UTILITIES
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function setLoading(button, isLoading) {
    button.disabled = isLoading;
    button.dataset.originalText = button.dataset.originalText || button.textContent;
    button.textContent = isLoading ? "Submitting..." : button.dataset.originalText;
}

function showMessage(el, text, type = "error") {
    el.textContent = text;
    el.classList.remove("show", "error", "success");
    void el.offsetWidth;
    el.classList.add("show", type);

    clearTimeout(el._hideTimer);
    el._hideTimer = setTimeout(() => {
        el.classList.remove("show", "error", "success");
        el.textContent = "";
    }, 3000);
}

function hideMessages(...els) {
    els.forEach((el) => {
        el.classList.remove("show", "error", "success");
        el.textContent = "";
    });
}

// CORE SUBMIT HANDLER
async function handleWaitlistSubmit({ nameValue, emailValue, button, errorEl, successEl, inputEl, nameInputEl }) {
    const email = emailValue.trim().toLowerCase();
    const name = nameValue ? nameValue.trim() : null; // Get name value

    hideMessages(errorEl, successEl);

    if (!email) {
        showMessage(errorEl, "Please enter your email address.", "error");
        return;
    }
    if (!validateEmail(email)) {
        showMessage(errorEl, "Please enter a valid email address.", "error");
        return;
    }

    setLoading(button, true);

    try {
        const client = getSupabaseClient();

        const { error: insertError } = await client
            .from("herly-waitlist")
            .insert([{ email, name }]);

        if (insertError) {
            // Postgres unique-violation — email already registered
            if (insertError.code === "23505") {
                showMessage(errorEl, "This email is already on the waitlist.", "error");
                return;
            }
            throw insertError;
        }

        showMessage(successEl, "You're on the list 🎉", "success");
        inputEl.value = "";
        if (nameInputEl) nameInputEl.value = "";

    } catch (err) {
        console.error("Waitlist error:", err);

        showMessage(errorEl, "Something went wrong. Please try again.", "error");
    } finally {
        setLoading(button, false);
    }
}

// ATTACH LISTENERS
document.addEventListener("DOMContentLoaded", () => {

    // — Hero form —
    const waitlistForm = document.getElementById("waitlistForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");

    if (waitlistForm) {
        const heroButton = waitlistForm.querySelector("button[type='submit']");
        waitlistForm.addEventListener("submit", (e) => {
            e.preventDefault();
            handleWaitlistSubmit({
                nameValue: nameInput ? nameInput.value : "",
                emailValue: emailInput.value,
                button: heroButton,
                errorEl: errorMessage,
                successEl: successMessage,
                inputEl: emailInput,
                nameInputEl: nameInput,
            });
        });
    }

    // — Final form —
    const finalForm = document.getElementById("finalForm");
    const finalName = document.getElementById("finalName");
    const finalEmail = document.getElementById("finalEmail");
    const ferrorMessage = document.getElementById("ferrorMessage");
    const fsuccessMessage = document.getElementById("fsuccessMessage");

    if (finalForm) {
        const finalButton = finalForm.querySelector("button[type='submit']");
        finalForm.addEventListener("submit", (e) => {
            e.preventDefault();
            handleWaitlistSubmit({
                nameValue: finalName ? finalName.value : "",
                emailValue: finalEmail.value,
                button: finalButton,
                errorEl: ferrorMessage,
                successEl: fsuccessMessage,
                inputEl: finalEmail,
                nameInputEl: finalName,
            });
        });
    }
});
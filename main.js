var typed = new Typed(".text", {
    strings: ["FullStack Developer", "Web Developer", "Mobile App Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

document.getElementById("currentYear").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", async (e)=> {
    e.preventDefault();

    let submitBtn = document.querySelector(".send");

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        subject: e.target.subject.value,
        message: e.target.message.value
    };

    try {
    const response = await fetch("https://portfolio-production-011b.up.railway.app/send", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    document.getElementById("statusMessage").textContent = result.message;

    e.target.reset();
} catch (error) {
    alert("Something went wrong. Please try again.");
} finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit"
}
})
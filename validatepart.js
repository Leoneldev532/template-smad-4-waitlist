<style type="text/tailwindcss">


        :root {
        --color-clifford: #da373d;
        }




        </style>

        <style>

            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

       * {
        font-family: "poppins", sans-serif;
       }



        </style>


        <script>
            const private_key = "smad250208172113c78c8db84d";
            const project_id = "6d36ba7c-106b-4173-9c36-a86fb83b9d18";

            document.addEventListener("DOMContentLoaded", () => {
                const form = document.querySelector("form");
                const emailInput = document.getElementById("emailInput");
                const submitButton = document.getElementById("submitButton");
                const buttonText = document.getElementById("buttonText");
                const loader = document.getElementById("loader");
                const successIcon = document.getElementById("successIcon");
                const errorMessage = document.getElementById("errorMessage");

                form.addEventListener("submit", async (event) => {
                    event.preventDefault();
                    const email = emailInput.value.trim();

                    if (!email) {
                        errorMessage.textContent = "Please enter a valid email address.";
                        errorMessage.classList.remove("hidden");
                        return;
                    }

                    errorMessage.classList.add("hidden");
                    submitButton.disabled = true;
                    buttonText.classList.add("hidden");
                    loader.classList.remove("hidden");

                    const payload = { email, project_id, private_key };

                    try {
                        const response = await fetch("https://api.smadmail.com/api/v1/email/save", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload),
                        });

                        if (response.ok) {
                            loader.classList.add("hidden");
                            successIcon.classList.remove("hidden");
                            setTimeout(() => {
                                successIcon.classList.add("hidden");
                                buttonText.classList.remove("hidden");
                                submitButton.disabled = false;
                            }, 2000);
                            emailInput.value = "";
                            emailInput.disabled = false;
                        } else {
                            const errorData = await response.json();
                            errorMessage.textContent = `Error: ${errorData.message || "Failed to save email."}`;
                            errorMessage.classList.remove("hidden");
                        }
                    } catch (error) {
                        errorMessage.textContent = "An error occurred while saving the email. Please try again.";
                        errorMessage.classList.remove("hidden");
                        console.error(error);
                    } finally {
                        loader.classList.add("hidden");
                        if (!successIcon.classList.contains("hidden")) {
                            setTimeout(() => {
                                successIcon.classList.add("hidden");
                                buttonText.classList.remove("hidden");
                                submitButton.disabled = false;
                            }, 2000);
                        } else {
                            buttonText.classList.remove("hidden");
                            submitButton.disabled = false;
                        }
                    }
                });
            });
        </script>

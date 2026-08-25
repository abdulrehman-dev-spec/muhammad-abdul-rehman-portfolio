import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const {
      name,
      email,
      company,
      budget,
      message,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      company,
      budget,
      message,
    });

    return res.status(201).json({
      success: true,
      message:
        "Your message has been received successfully.",
      data: {
        id: contact._id,
      },
    });
  } catch (error) {
    console.error("Contact creation error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Something went wrong while sending your message.",
    });
  }
};
import express from "express";

import {
  getContacts,
  updateContactStatus,
  deleteContact,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/contacts", getContacts);

router.patch(
  "/contacts/:id/status",
  updateContactStatus
);

router.delete(
  "/contacts/:id",
  deleteContact
);

export default router;
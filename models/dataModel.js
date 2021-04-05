import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
  personal: { type: Object, required: true },
  education: { type: Object, required: true },
  project: { type: Object, required: true },
  experiance: { type: Object, required: true },
  skills: { type: Object, required: true },
  id: { type: String },
});

export default mongoose.model("Data", dataSchema);

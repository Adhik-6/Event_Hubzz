import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String,
      default: "Not specified"
    },
    venue: { 
      type: String, 
      required: true 
    },
    category: {
      type: String,
      enum: [
        "Education", 
        "Technology", 
        "Business", 
        "Entertainment", 
        "Arts & Culture", 
        "Health & Wellness", 
        "Sports & Fitness", 
        "Food & Drink", 
        "Community & Causes", 
        "Other"
      ],
      required: true,
    },
    startDate: { 
      type: Date, 
      required: true,
    },
    startTime: { 
      type: Date, 
      required: true,
    },
    endDate: { 
      type: Date, 
      required: true,
    },
    endTime: { 
      type: Date, 
      required: true,
    },
    capacity: { 
      type: Number,
    },
    registrations: {
      type: Number,
      default: 0
    },
    eventImage: { 
      type: String,
      default: "https://th.bing.com/th?id=OIP.380uvanDzyz9M3X90_EQbwHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
    },
    externalUrl: {
      type: String,
    },
    formFields: [
      {
        id: { type: String, required: true },
        label: { type: String, required: true },
        options: [{
          id: {type: String, required: true},
          value: {type: String, required: true},
        }],
        placeholder: { type: String },
        required: { type: Boolean, required: true },
        type: { type: String, required: true },
      }
    ],
    organiser: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Organiser", 
      required: true 
    },
  },
  { timestamps: true }
);


const Event = mongoose.model("Event", eventSchema);
export default Event;

import { User, Event } from "./../models/index.models.js"
import { customAPIError } from "../utils/index.utils.js";
import mongoose from "mongoose";

export const getEventSummary = async (req, res) => {
  const { id } = req.params;
  // console.log("id (getEventSummary) : ", id)
  const dbRes = await Event.findById(id).select("capacity registrations").lean();

  // if(!dbRes.capacity) return res.status(200).json({ success: true, message: "No capacity no %", dbRes })

  // dbRes.percentage = ((dbRes.registrations / dbRes.capacity)*100).toFixed(2)

  // console.log("dbRes (getEventSummary) ", dbRes)
  
  res.status(200).json({ success: true, message: "User count & capacity retrieved successfully", dbRes })
}

export const registrationsOverTime = async (req, res) => {
  const { id } = req.params;
  // console.log("id (registrationsOverTime): ", id)
  
  const dbRes = await User.aggregate([
    {$match: {
      eventId: new mongoose.Types.ObjectId(id)
    }},
    {$group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date only
      count: { $sum: 1 }
    }},
    {$sort: {
      _id: 1 // Ascending order by date
    }},
    {$project: {
      _id: 0,
      date: "$_id",
      count: 1
    }}
  ])

  // console.log("dbRes (registrationsOverTime): ", dbRes)

  res.status(200).json({ success: true, message: "Registration data fetched successfully", dbRes })
}

// changed
export const getTableData = async (req, res) => {
  const { id } = req.params;
  // console.log("id (getTableData): ", id)

  const allRegistrations = await User.find({ eventId: new mongoose.Types.ObjectId(id) }, { __v: 0, eventId: 0, userId: 0, updatedAt: 0 }).sort({ createdAt: 1 }).lean();

  // console.log("allRegistrations: ", allRegistrations)

  res.status(200).json({ success: true, message: "Table values fetched successfully", allRegistrations })
}

// 🙏🏻
export const getPieChartData = async (req, res) => {
  const { id } = req.params;
  
  const dbRes = await Event.aggregate([
    // Step 1: Find the event
    {
      $match: { _id: new mongoose.Types.ObjectId(id) } // Assuming 'id' is defined elsewhere
    },
    // Step 2: Project and filter relevant formFields
    {
      $project: {
        _id: 1, // Keep _id for the lookup let clause
        formFields: {
          $filter: {
            input: "$formFields",
            as: "field",
            cond: {
              $in: ["$$field.type", ["dropdown", "checkbox", "multiple_choice"]]
            }
          }
        }
      }
    },
    // Step 3: Lookup and process user responses
    {
      $lookup: {
        from: "users",
        let: { eventId: "$_id", formFields: "$formFields" }, // Pass necessary fields
        pipeline: [
          // Match users for the specific event
          {
            // IMPORTANT: Use the passed eventId, not a hardcoded one unless intended
            $match: { $expr: { $eq: ["$eventId", "$$eventId"] } }
          },
          // Convert responses object to array, handle missing/null responses object
          {
            $project: {
              responsesArray: { $objectToArray: { $ifNull: ["$responses", {}] } } // Use empty object if responses is null/missing
            }
          },
          // Unwind each response key-value pair
          { $unwind: "$responsesArray" },
  
          // Normalize the value: Replace null/undefined/empty array with placeholder BEFORE unwinding potential arrays
          {
            $project: {
              label: "$responsesArray.k", // The question label
              normalizedValue: {
                $let: {
                    vars: { originalValue: "$responsesArray.v" },
                    in: {
                      $cond: [
                         // Check if value is null or an empty array
                        { $or: [
                          { $eq: ["$$originalValue", null] },
                          { $eq: ["$$originalValue", [] ] }
                        ]},
                         "__NO_RESPONSE__", // Use a placeholder for counting
                         "$$originalValue" // Otherwise keep the original value
                      ]
                  }
                }
              }
            }
          },
          // Ensure the value is an array for consistent unwinding (handles single values, arrays, and the placeholder)
          {
            $project: {
              label: "$label",
              valueArray: {
                  $cond: [
                    { $isArray: "$normalizedValue" },
                    // If it's already an array (e.g., checkbox that wasn't empty), use it
                    "$normalizedValue",
                     // Otherwise, wrap the single value (dropdown, multiple choice, or "__NO_RESPONSE__") in an array
                    [ "$normalizedValue" ]
                ]
              }
            }
          },
          // Unwind the value array (flattens checkbox selections and makes single values processable)
          { $unwind: "$valueArray" },
          // Rename the unwound value for clarity
          {
            $project: {
              label: "$label",
              value: "$valueArray" // This is now a single selection OR "__NO_RESPONSE__"
            }
          },
          // *** MODIFICATION END ***
  
          // Count occurrences for each question label and value (including "__NO_RESPONSE__")
          {
            $group: {
              _id: {
                label: "$label",
                value: "$value" // Group by the actual value or the placeholder
              },
              count: { $sum: 1 }
            }
          },
          // Group counts by question label
          {
            $group: {
              _id: "$_id.label", // Group by question label
              data: {
                $push: {
                  name: { // Rename placeholder back to "No Response" for display
                    $cond: [
                      { $eq: ["$_id.value", "__NO_RESPONSE__"] },
                      "No Response", // User-friendly name
                      "$_id.value"  // Original value name
                    ]
                  },
                  value: "$count"
                }
              },
              total: { $sum: "$count" } // Sum counts for this question
            }
          }
        ],
        as: "questionSummaries"
      }
    },
    {
      $lookup: {
        from: "users",
        let: { eventId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$eventId", "$$eventId"] }
            }
          },
          {
            $group: {
              _id: "$checkedIn",
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              name: {
                $cond: [
                  { $eq: ["$_id", true] },
                  "Present",
                  "Absent"
                ]
              },
              value: "$count"
            }
          },
          {
            $group: {
              _id: null,
              data: { $push: { name: "$name", value: "$value" } },
              total: { $sum: "$value" }
            }
          },
          {
            $project: {
              _id: 0,
              attendanceSummary: {
                field: {
                  id: { $literal: new mongoose.Types.ObjectId() }, // or a fixed ObjectId for "Attendance"
                  label: "Attendance"
                },
                data: "$data",
                total: "$total"
              }
            }
          }
        ],
        as: "attendanceSummaryArr"
      }
    },

    // Step 4: Merge field meta with response data
    {
      $project: {
        // Map over the original formFields to ensure all relevant fields are included
        questionSummaries: {
          $concatArrays: [
            {
              $map: {
                input: "$formFields",
                as: "field",
                in: {
                  $let: {
                    vars: {
                      matchSummary: {
                        $first: {
                          $filter: {
                            input: "$questionSummaries",
                            as: "summary",
                            cond: { $eq: ["$$summary._id", "$$field.label"] }
                          }
                        }
                      }
                    },
                    in: {
                      field: {
                        id: "$$field._id",
                        label: "$$field.label"
                      },
                      data: { $ifNull: ["$$matchSummary.data", []] },
                      total: { $ifNull: ["$$matchSummary.total", 0] }
                    }
                  }
                }
              }
            },
            { $ifNull: ["$attendanceSummaryArr.attendanceSummary", []] } // safely append attendance
          ]
        }
      }
    },
    // Optional Step 5: Extract just the summaries array
    {
      $replaceRoot: { newRoot: { questionSummaries: "$questionSummaries" } }
    }
  ])

  // console.log("dbRes (pieChart data): ", dbRes)

  res.status(200).json({ success: true, message: "Pie chart data fetched successfully", dbRes: dbRes[0].questionSummaries })
}
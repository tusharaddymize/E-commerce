import "dotenv/config";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

import connectDB from "./config/db.js";
import Pincode from "./models/pincode.js";

// ==========================================
// FILE PATH
// ==========================================

const csvFilePath = path.join(
  process.cwd(),
  "data",
  "pincode.csv"
);

// ==========================================
// START SEEDING
// ==========================================

const seedPincodes = async () => {
  try {
    console.log("=================================");
    console.log("🚀 Pincode Seeder Started");
    console.log("=================================");

    // ======================================
    // CONNECT DATABASE
    // ======================================

    await connectDB();

    console.log("✅ MongoDB connected");

    // ======================================
    // CHECK CSV FILE
    // ======================================

    if (!fs.existsSync(csvFilePath)) {
      console.error(
        "❌ CSV file not found:",
        csvFilePath
      );

      process.exit(1);
    }

    console.log(
      "📁 CSV found:",
      csvFilePath
    );

    // ======================================
    // READ CSV
    // ======================================

    const pincodesMap = new Map();

    let totalRows = 0;
    let invalidRows = 0;

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(
          csv({
            mapHeaders: ({ header }) =>
              header
                ?.replace(/^\uFEFF/, "")
                .trim()
                .toLowerCase(),
          })
        )
        .on("data", (row) => {
          totalRows++;

          // ==================================
          // PINCODE
          // ==================================

          const rawPincode =
            row.pincode ||
            row.pin_code ||
            row.postal_code;

          if (!rawPincode) {
            invalidRows++;
            return;
          }

          const pincode = String(
            rawPincode
          ).trim();

          // Only valid Indian 6 digit pincodes
          if (!/^\d{6}$/.test(pincode)) {
            invalidRows++;
            return;
          }

          // ==================================
          // STATE
          // ==================================

          const state =
            row.statename ||
            row.state ||
            row.state_name ||
            "";

          // ==================================
          // DISTRICT
          // ==================================

          const district =
            row.districtname ||
            row.district ||
            row.district_name ||
            "";

          // ==================================
          // CITY / OFFICE
          // ==================================

          const city =
            row.officename ||
            row.office_name ||
            row.city ||
            "";

          // ==================================
          // DEDUPLICATE
          // ==================================

          if (!pincodesMap.has(pincode)) {
            pincodesMap.set(pincode, {
              pincode,
              state: String(state).trim(),
              district: String(district).trim(),
              city: String(city).trim(),
            });
          }
        })
        .on("end", resolve)
        .on("error", reject);
    });

    console.log(
      `📊 CSV rows read: ${totalRows}`
    );

    console.log(
      `❌ Invalid rows: ${invalidRows}`
    );

    console.log(
      `📦 Unique pincodes: ${pincodesMap.size}`
    );

    // ======================================
    // NOTHING TO INSERT
    // ======================================

    if (pincodesMap.size === 0) {
      console.error(
        "❌ No valid pincodes found."
      );

      console.log(
        "Please check CSV column names."
      );

      process.exit(1);
    }

    // ======================================
    // BULK INSERT / UPSERT
    // ======================================

    const pincodes = Array.from(
      pincodesMap.values()
    );

    const BATCH_SIZE = 1000;

    let processed = 0;

    for (
      let i = 0;
      i < pincodes.length;
      i += BATCH_SIZE
    ) {
      const batch = pincodes.slice(
        i,
        i + BATCH_SIZE
      );

      const operations = batch.map(
        (item) => ({
          updateOne: {
            filter: {
              pincode: item.pincode,
            },

            update: {
              $set: {
                state: item.state,
                district: item.district,
                city: item.city,
              },
            },

            upsert: true,
          },
        })
      );

      await Pincode.bulkWrite(
        operations,
        {
          ordered: false,
        }
      );

      processed += batch.length;

      console.log(
        `✅ Processed ${processed}/${pincodes.length}`
      );
    }

    // ======================================
    // FINAL COUNT
    // ======================================

    const totalInDB =
      await Pincode.countDocuments();

    console.log(
      "================================="
    );

    console.log(
      "🎉 PINCODE SEEDING COMPLETED"
    );

    console.log(
      `📍 Total pincodes in MongoDB: ${totalInDB}`
    );

    console.log(
      "================================="
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "❌ Pincode seeding failed:"
    );

    console.error(error);

    process.exit(1);
  }
};

// ==========================================
// RUN
// ==========================================

seedPincodes();
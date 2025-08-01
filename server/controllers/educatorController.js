import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import Course from "../models/Course.js";
import { Purchase } from "../models/Purchase.js";
import User from '../models/User.js'

export const updateRoleToEducator = async (req, res) => {
  try {
    const { userId } = await req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: "educator",
      },
    });

    res.json({ success: true, message: "You can publish a course now" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add New Course
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Thumbnail Not Attached" });
    }

    const parsedCourseData = JSON.parse(courseData);

    // ✅ Upload image first
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    // ✅ Assign all required fields BEFORE create
    parsedCourseData.educator = educatorId;
    parsedCourseData.courseThumbnail = imageUpload.secure_url;

    // ✅ Now create with all required data
    const newCourse = await Course.create(parsedCourseData);

    res.status(201).json({ success: true, message: "Course Added", course: newCourse });
  } catch (error) {
    console.error("Error in addCourse:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Get Educator Courses

export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get Educator dashboard Data (Total Earning , enrolled Students , No.of Courses)

export const educatorDashboardData = async (req ,res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course._id);

    // Calculate total earnings from purchases
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    // collect uniquie enrolled student IDs with their course titles.
    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl"
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        enrolledStudentsData,
        totalCourses,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// get enrolled students data with purchased data.
export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseData: purchase.createdAt,
    }));
    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

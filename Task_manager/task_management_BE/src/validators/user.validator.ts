import * as yup from "yup";

const defaultProfilePic =
  "../task_management_BE/public/profile_pic_default.jpg";

const createUserSchema = yup.object({
  userName: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  profilePic: yup.string().default(defaultProfilePic),
});

export { createUserSchema };

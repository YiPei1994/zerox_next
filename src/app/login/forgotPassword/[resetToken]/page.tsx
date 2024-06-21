import ResetPasswordForm from "./ResetPasswordForm";

export default function page({ params }: { params: { resetToken: string } }) {
  return <ResetPasswordForm resetToken={params.resetToken} />;
}

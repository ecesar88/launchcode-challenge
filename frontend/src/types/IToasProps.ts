interface IToastProps {
  status: "success" | "error" | "info" | "loading" | "warning"
  title: string
  description?: string
  duration?: number
}

export default IToastProps

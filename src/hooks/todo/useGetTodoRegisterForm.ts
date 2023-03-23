import { useController, Control } from "react-hook-form";

export const useGetTodoRegisterForm = ({
  control,
}: {
  control: Control<{ title: string; content: string }>;
}) => {
  const { field: title } = useController({
    control,
    name: "title",
  });

  const { field: content } = useController({
    control,
    name: "content",
  });

  return { title, content };
};

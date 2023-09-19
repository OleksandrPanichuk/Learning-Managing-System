"use client"

import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormField,
  FormDescription, FormItem
} from '@/components/ui/form'
import {Button} from '@/components/ui/button'
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
})

type TypeFormData = z.infer<typeof formSchema>
const CreateCoursePage = () => {
  const router = useRouter()
  const form = useForm<TypeFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ''
    }
  })
  const {handleSubmit, control, formState:{isSubmitting, isValid}} = form

  const onSubmit = async (values:TypeFormData) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course created");
    } catch {
      toast.error("Something went wrong");
    }
  }

  return <div className={'max-w-5xl mx-auto flex md:items-center md:jsutify-center h-full p-6'}>
    <div>
      <h1 className="text-2xl">
        Name your course
      </h1>
      <p className="text-sm text-slate-600">
        What would you like to name your course? Don&apos;t worry, you can change this later.
      </p>
      <Form {...form}>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
        >
          <FormField
              control={control}
              name="title"
              render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Course title
                    </FormLabel>
                    <FormControl>
                      <Input
                          disabled={isSubmitting}
                          placeholder="e.g. 'Advanced web development'"
                          {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What will you teach in this course?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
              )}
          />
          <div className="flex items-center gap-x-2">
            <Link href="/">
              <Button
                  type="button"
                  variant="ghost"
              >
                Cancel
              </Button>
            </Link>
            <Button
                type="submit"
                disabled={!isValid || isSubmitting}
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  </div>;
};

export default CreateCoursePage;

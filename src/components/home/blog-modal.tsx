import {
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  Portal,
} from "@chakra-ui/react";
import { blogs } from "@/utils/mockData";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

interface BlogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blogId: number;
}

const BlogModal = ({ open, onOpenChange, blogId }: BlogModalProps) => {
  const [blog, setBlog] = useState<any | null>(null);

  useEffect(() => {
    const blog = blogs.find((blog) => blog.id === blogId);
    if (blog) {
      setBlog(blog);
    }
  }, [blogId]);

  return useMemo(
    () => (
      <Drawer.Root
        open={open}
        onOpenChange={(e) => onOpenChange(e.open)}
        placement="bottom"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner className="flex justify-center">
            <Drawer.Content className="w-[430px] rounded-t-lg bg-secondary shadow-none p-base h-5/6">
              <DrawerHeader className="flex p-0">
                <div>
                  <DrawerTitle className="text-lg font-bold text-text_dark text-left">
                    {blog?.title}
                  </DrawerTitle>
                  <DrawerDescription className="text-sm text-text_dark text-left pb-base">
                    author: {blog?.author}
                  </DrawerDescription>
                </div>
                <DrawerCloseTrigger className="absolute right-base top-base">
                  <X className="text-text_dark size-4" />
                </DrawerCloseTrigger>
              </DrawerHeader>
              <DrawerBody className="px-0 flex flex-col gap-base">
                {/* <div className="aspect-video bg-primary rounded-lg">

                </div> */}
                <p className="text-text_dark text-sm">{blog?.paragraph_1}</p>
                <p className="text-text_dark text-sm">{blog?.paragraph_2}</p>
                <p className="text-text_dark text-sm">{blog?.paragraph_3}</p>
                {/* <div className="aspect-video bg-primary rounded-lg">

                </div> */}
                <p className="text-text_dark text-sm">{blog?.paragraph_4}</p>
                <p className="text-text_dark text-sm">{blog?.paragraph_5}</p>
                <p className="text-text_dark text-sm">{blog?.paragraph_6}</p>
              </DrawerBody>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    ),
    [blog, open]
  );
};

export default BlogModal;

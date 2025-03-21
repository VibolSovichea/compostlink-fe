import { Card } from "@chakra-ui/react"

interface NewsCardProps {
  data: string;
}

const NewsCard = ({ data }: NewsCardProps) => {
  return (
    <Card.Root className="w-full bg-white shadow-xl h-52">
      <Card.Body className="flex flex-col justify-center items-center h-full aspect-video p-0">
        <iframe width="100%" height="100%" src={data} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="rounded-lg"></iframe>
      </Card.Body>
    </Card.Root>
  )
}

export default NewsCard;
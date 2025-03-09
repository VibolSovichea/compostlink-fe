import { Card } from "@chakra-ui/react"

const NewsCard = () => {
  return (
    <Card.Root className="w-full bg-white shadow-xl h-32">
      <Card.Body className="flex flex-col justify-center items-center">
        <div className="text-black text-center text-sm">Under Construction</div>
      </Card.Body>
    </Card.Root>
  )
}

export default NewsCard;
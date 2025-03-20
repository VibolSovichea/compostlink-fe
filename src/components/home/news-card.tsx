import { Card } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Compost from "@/../public/assets/images/compost.png";

const NewsCard = () => {
  const articles = [
    { id: 1, title: "How to Compost at Home", image: Compost },
    { id: 2, title: "Benefits of Composting", image: Compost },
    { id: 3, title: "Community Composting Guide", image: Compost },
  ];

  return (
    <div className="px-1 mt-2 w-full justify-center">
      {/* News Section */}
      <h2 className="text-x font-semibold mb-4 text-black">News</h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-2xl shadow-sm p-4 cursor-pointer border border-green-500"
            onClick={() => alert(`View article: ${article.title}`)}
          >
            <div className="aspect-video relative mb-2 rounded-xl overflow-hidden">
              <Image src={article.image} alt={article.title} fill className="object-cover" />
            </div>
            <h3 className="font-bold text-black">{article.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsCard;

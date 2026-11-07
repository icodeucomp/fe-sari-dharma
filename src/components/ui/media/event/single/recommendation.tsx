import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Img, Motion } from "@/components";
import { LuTag } from "react-icons/lu";
import { convertDate } from "@/utils";
import { CommunityEvent, getCommunityEvent } from "@/services/community-event.service";

const RecommendationEvent = () => {
  const { data: events = [], isLoading: loading } = useQuery({
    queryKey: ["community-events", "recommendation"],
    queryFn: () => getCommunityEvent(1, 3),
    select: (response) => response.data.data as CommunityEvent[],
  });

  return (
    <div className="space-y-4 divide-y-2 divide-primary">
      <Motion tag="h4" initialY={50} animateY={0} duration={0.5} className="text-xl font-semibold text-primary">
        Event & Community Lainnya
      </Motion>
      <div className="pt-4 space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : (
          events.map((event, index) => (
            <Motion
              tag="div"
              initialY={50}
              animateY={0}
              duration={0.5}
              delay={index * 0.1}
              key={event.id}
              className="pb-4 space-y-2 border-b border-gray/30"
            >
              <Img
                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${event.photo}`}
                alt={event.title}
                className="w-full min-h-32"
                cover
              />
              <span className="flex items-center gap-2 px-4 py-2 text-xs rounded-md w-max bg-secondary text-light">
                <LuTag size={16} />
                Edukasi Kesehatan
              </span>
              <div className="space-y-1 text-dark">
                <span className="text-sm font-light">{convertDate(event.created_at)}</span>
                <Link href={`/media-information/community-events/${event.slug}/${event.id}`}>
                  <h3 className="font-semibold line-clamp-2">{event.title}</h3>
                </Link>
              </div>
            </Motion>
          ))
        )}
      </div>
    </div>
  );
};

export const Recommendation = () => {
  return (
    <div className="pb-8 pr-2 space-y-4">
      <RecommendationEvent />
    </div>
  );
};

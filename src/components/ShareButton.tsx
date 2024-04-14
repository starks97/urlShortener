interface ShareButtonProps {
  title: string;
  shortUrl: string;
}

export default function ShareButton({ ...props }: ShareButtonProps) {
  const redirect = import.meta.env.VITE_REDIRECT_SHORT_URL;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: props.title,
          text: "Check out this link",
          url: `${redirect}${props.shortUrl}`,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <>
      <button
        onClick={handleShare}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Share
      </button>
    </>
  );
}

import { Download } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface Design {
  id: string;
  title: string;
  titleFr: string;
  image: string;
  price: string;
  downloads: number;
  rating: number;
  isTrending: boolean;
  isNew: boolean;
}

interface DownloadButtonProps {
  design: Design;
  onUpgrade: () => void;
}

export default function DownloadButton({ design, onUpgrade }: DownloadButtonProps) {
  const { user, canDownload, updateUser } = useUser();
  const { allowed, reason } = canDownload(design.id);

  const handleDownload = () => {
    if (!allowed) {
      onUpgrade();
      return;
    }

    // Simulate download
    const link = document.createElement('a');
    link.href = design.image;
    link.download = `${design.title}.png`;
    link.click();

    // Update user's download count if not already downloaded
    if (!user.downloadedDesigns.includes(design.id)) {
      updateUser({
        ...user,
        downloadsUsed: user.downloadsUsed + 1,
        downloadedDesigns: [...user.downloadedDesigns, design.id],
      });
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full py-4 bg-gradient-to-r from-krown-red to-krown-orange text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      disabled={!allowed}
    >
      <Download className="w-5 h-5" />
      {reason}
    </button>
  );
}

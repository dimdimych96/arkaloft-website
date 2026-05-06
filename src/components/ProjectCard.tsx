import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: string;
  title: string;
  description?: string;
  image?: string;
  status: 'draft' | 'in_progress' | 'completed';
}

export const ProjectCard = ({ id, title, description, image, status }: ProjectCardProps) => {
  const statusColors = {
    draft: 'bg-neutral-200 text-neutral-700',
    in_progress: 'bg-primary/10 text-primary',
    completed: 'bg-accent/10 text-accent',
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <div className="relative aspect-video overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
        )}
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status.replace('_', ' ')}
        </span>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold font-heading text-neutral-900 mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-neutral-600 mb-4 line-clamp-2">{description}</p>
        )}
        <Link
          to={`/projects/${id}`}
          className="inline-flex items-center text-primary hover:text-primary-dark transition-colors font-medium"
        >
          View Project
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

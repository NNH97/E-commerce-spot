import Link from 'next/link';

export default function CategoryCard({ category }) {
  return (
    <Link href={`/products?category=${category.id}`}>
      <div className="group relative overflow-hidden rounded-2xl glass card-hover cursor-pointer">
        <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
          <span className="text-7xl group-hover:scale-125 transition-transform duration-500">
            {category.icon}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                      flex flex-col justify-end p-6">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 
                      translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

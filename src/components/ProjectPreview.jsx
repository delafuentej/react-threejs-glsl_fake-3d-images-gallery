import { galleryItems } from "../constants";

const ProjectPreview = ({ activeIndex }) => {
  const item = galleryItems[activeIndex];

  if (!item) return null; // Protege contra undefined

  return (
    <div className="col project-preview flex-2 relative p-4">
      <div className="project-details absolute top-4 left-4 w-1/2">
        <div className="title mb-2">
          <h1>{item.title}</h1>
        </div>
        <div className="info mb-4">
          <p>{item.description}</p>
        </div>
      </div>

      <div className="project-img absolute left-4 bottom-4 w-3/4 h-1/2 overflow-hidden">
        <img
          src={item.fake3dImg}
          alt={item.title}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default ProjectPreview;

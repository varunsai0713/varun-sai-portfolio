const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left"
}) => {
  return <div className={`mb-12 ${align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}`}>
      {eyebrow && <span className="inline-block text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-2">
          {eyebrow}
        </span>}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      {description && <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>}
    </div>;
};
export {
  SectionHeading
};

import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type Project = {
  name: string;
  description: string;
  github: string;
  tags?: string[];
};

const projects: Project[] = [
  {
    name: 'ML-gfx906',
    description: 'ML software builds for AMD gfx906 GPUs, e.g. Radeon VII / MI50 / MI60',
    github: 'https://github.com/mixa3607/ML-gfx906',
    tags: ['ML', 'amd-gpu'],
  },
  {
    name: 'Helm charts',
    description: 'Collection of helm charts',
    github: 'https://github.com/mixa3607/charts',
    tags: ['kube', 'helm'],
  },
  {
    name: 'uefi-mod-tools',
    description: 'UEFI bios and BMC mod tools like smbios/dmi table edit',
    github: 'https://github.com/mixa3607/uefi-mod-tools',
    tags: ['BIOS', 'BMC', "mod-tools"],
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className={styles.fillSpace}></div>

      {project.tags && (
        <div className={styles.tags}>
          {project.tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
    </a>
  );
}

export default function Home(): ReactNode {
  const {
    siteConfig: { customFields, tagline },
  } = useDocusaurusContext();

  const { description } = customFields as { description: string };

  return (
    <Layout title={tagline} description={description}>
      <main className={styles.root}>
        <div className={styles.background} />

        <div className={styles.content}>
          <section className={styles.hero}>
            <h1>KBD</h1>
            <p className={styles.subtitle}>
              Что-то, как-то, где-то
            </p>
          </section>

          <section className={styles.projects}>
            {projects.map(project => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </section>
        </div>
      </main>
    </Layout>
  );
}
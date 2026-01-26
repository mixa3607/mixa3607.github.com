import React from 'react';

type FileInfoProps = {
  name: string;
  downloadUrl: string;
  sha256hash?: string;
  version?: string;
  children?: React.ReactNode;
};

export default function FileInfo({
  name,
  downloadUrl,
  sha256hash,
  version,
  children,
}: FileInfoProps) {
  return (
    <div
      style={{
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: 8,
        padding: '1rem',
        margin: '1rem 0',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '0.75rem',
        }}
      >
        <div>
          <div style={{ fontWeight: 600 }}>{name}</div>
        </div>

        <a
          href={downloadUrl}
          download
          className="button button--primary button--sm"
          style={{ whiteSpace: 'nowrap' }}
        >
          Download
        </a>
      </div>

      {/* Content */}
      {sha256hash && (
        <div
          style={{
            fontSize: '0.85rem',
            color: 'var(--ifm-color-emphasis-600)',
            wordBreak: 'break-all',
            marginTop: '0.25rem',
          }}
        >
          Hash: <code>{sha256hash}</code>
        </div>
      )}
      {version && (
        <div
          style={{
            fontSize: '0.85rem',
            color: 'var(--ifm-color-emphasis-600)',
            wordBreak: 'break-all',
            marginTop: '0.25rem',
          }}
        >
          Ver: <code>{version}</code>
        </div>
      )}
      {children && <div>{children}</div>}
    </div>
  );
}
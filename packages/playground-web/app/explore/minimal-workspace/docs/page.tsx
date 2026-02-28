import { TemplateDocsPage } from '../../../../components/explore/docs/TemplateDocsPage';
import { getTemplateDocsData } from '../../../../data/template-docs';

export default function MinimalWorkspaceDocs() {
  const data = getTemplateDocsData('minimal-workspace');

  if (!data) {
    return <div>Documentation not found</div>;
  }

  return <TemplateDocsPage data={data} />;
}

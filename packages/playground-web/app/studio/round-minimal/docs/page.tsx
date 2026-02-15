import { TemplateDocsPage } from '../../../../components/studio/docs/TemplateDocsPage';
import { getTemplateDocsData } from '../../../../data/template-docs';

export default function RoundMinimalDocs() {
  const data = getTemplateDocsData('round-minimal');

  if (!data) {
    return <div>Documentation not found</div>;
  }

  return <TemplateDocsPage data={data} />;
}

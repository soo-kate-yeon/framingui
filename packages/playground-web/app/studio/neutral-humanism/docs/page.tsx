import { TemplateDocsPage } from '../../../../components/studio/docs/TemplateDocsPage';
import { getTemplateDocsData } from '../../../../data/template-docs';

export default function NeutralHumanismDocs() {
  const data = getTemplateDocsData('neutral-humanism');

  if (!data) {
    return <div>Documentation not found</div>;
  }

  return <TemplateDocsPage data={data} />;
}

import { TemplateDocsPage } from '../../../../components/studio/docs/TemplateDocsPage';
import { getTemplateDocsData } from '../../../../data/template-docs';

export default function EquinoxFitnessDocs() {
  const data = getTemplateDocsData('dark-boldness');

  if (!data) {
    return <div>Documentation not found</div>;
  }

  return <TemplateDocsPage data={data} />;
}

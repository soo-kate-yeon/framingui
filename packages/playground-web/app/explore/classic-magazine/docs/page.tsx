import { TemplateDocsPage } from '../../../../components/explore/docs/TemplateDocsPage';
import { getTemplateDocsData } from '../../../../data/template-docs';

export default function ClassicMagazineDocs() {
  const data = getTemplateDocsData('classic-magazine');

  if (!data) {
    return <div>Documentation not found</div>;
  }

  return <TemplateDocsPage data={data} />;
}

import { TemplateDocsPage } from '../../../../components/explore/docs/TemplateDocsPage';
import { getTemplateDocsData } from '../../../../data/template-docs';

export default function SquareMinimalismDocs() {
  const data = getTemplateDocsData('square-minimalism');

  if (!data) {
    return <div>Documentation not found</div>;
  }

  return <TemplateDocsPage data={data} />;
}

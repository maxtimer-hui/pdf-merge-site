interface HowToStep {
  name: string;
  text: string;
}

interface HowToSchema {
  "@context": string;
  "@type": string;
  name: string;
  step: Array<{
    "@type": string;
    position: number;
    name: string;
    text: string;
  }>;
}

export function generateHowToSchema(
  name: string,
  steps: HowToStep[]
): HowToSchema {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export const mergeHowTo = {
  en: {
    name: "How to Combine PDF Files Free",
    steps: [
      {
        name: "Upload PDF Files",
        text: "Click 'Upload PDF Files' or drag and drop your PDF files into the merge area.",
      },
      {
        name: "Arrange Order",
        text: "Drag and drop files to arrange them in your desired order.",
      },
      {
        name: "Combine PDFs",
        text: "Click the 'Combine PDF' button to merge your files into one PDF.",
      },
      {
        name: "Download",
        text: "Wait a moment for processing, then download your merged PDF file.",
      },
    ],
  },
  zh: {
    name: "如何免费合并PDF文件",
    steps: [
      {
        name: "上传PDF文件",
        text: "点击'上传PDF文件'或拖放您的PDF文件到合并区域。",
      },
      {
        name: "排列顺序",
        text: "拖放文件以按所需顺序排列。",
      },
      {
        name: "合并PDF",
        text: "点击'合并PDF'按钮将文件合并为一个PDF。",
      },
      {
        name: "下载",
        text: "等待处理完成，然后下载合并后的PDF文件。",
      },
    ],
  },
};

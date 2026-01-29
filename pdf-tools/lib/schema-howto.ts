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

export const splitHowTo = {
  en: {
    name: "How to Split PDF Files",
    steps: [
      {
        name: "Upload PDF",
        text: "Click 'Upload PDF' or drag and drop your PDF file into the split area.",
      },
      {
        name: "Choose Split Mode",
        text: "Select your preferred split mode: page range, single pages, or every N pages.",
      },
      {
        name: "Configure Settings",
        text: "Enter the page range or number of pages for splitting.",
      },
      {
        name: "Split & Download",
        text: "Click 'Split PDF' and download your split PDF files.",
      },
    ],
  },
  zh: {
    name: "如何分割PDF文件",
    steps: [
      {
        name: "上传PDF",
        text: "点击'上传PDF'或拖放您的PDF文件到分割区域。",
      },
      {
        name: "选择分割模式",
        text: "选择您喜欢的分割模式：页面范围、单页或每N页。",
      },
      {
        name: "配置设置",
        text: "输入分割的页面范围或页数。",
      },
      {
        name: "分割并下载",
        text: "点击'分割PDF'并下载分割后的PDF文件。",
      },
    ],
  },
};

export const extractHowTo = {
  en: {
    name: "How to Extract Pages from PDF",
    steps: [
      {
        name: "Upload PDF",
        text: "Click 'Upload PDF' or drag and drop your PDF file into the extract area.",
      },
      {
        name: "Select Pages",
        text: "Choose the pages you want to extract by entering page numbers or ranges.",
      },
      {
        name: "Extract Pages",
        text: "Click the 'Extract Pages' button to create a new PDF with selected pages.",
      },
      {
        name: "Download",
        text: "Wait for processing, then download your extracted PDF file.",
      },
    ],
  },
  zh: {
    name: "如何从PDF中提取页面",
    steps: [
      {
        name: "上传PDF",
        text: "点击'上传PDF'或拖放您的PDF文件到提取区域。",
      },
      {
        name: "选择页面",
        text: "通过输入页码或范围来选择要提取的页面。",
      },
      {
        name: "提取页面",
        text: "点击'提取页面'按钮创建包含所选页面的新PDF。",
      },
      {
        name: "下载",
        text: "等待处理，然后下载提取的PDF文件。",
      },
    ],
  },
};

export const compressHowTo = {
  en: {
    name: "How to Compress PDF Files",
    steps: [
      {
        name: "Upload PDF",
        text: "Click 'Upload PDF' or drag and drop your PDF file into the compress area.",
      },
      {
        name: "Select Compression Level",
        text: "Choose your preferred compression level: low, medium, or high.",
      },
      {
        name: "Compress PDF",
        text: "Click the 'Compress PDF' button to reduce your file size.",
      },
      {
        name: "Download",
        text: "Wait for compression to complete, then download your compressed PDF.",
      },
    ],
  },
  zh: {
    name: "如何压缩PDF文件",
    steps: [
      {
        name: "上传PDF",
        text: "点击'上传PDF'或拖放您的PDF文件到压缩区域。",
      },
      {
        name: "选择压缩级别",
        text: "选择您喜欢的压缩级别：低、中或高。",
      },
      {
        name: "压缩PDF",
        text: "点击'压缩PDF'按钮减小文件大小。",
      },
      {
        name: "下载",
        text: "等待压缩完成，然后下载压缩后的PDF。",
      },
    ],
  },
};

export const rotateHowTo = {
  en: {
    name: "How to Rotate PDF Pages",
    steps: [
      {
        name: "Upload PDF",
        text: "Click 'Upload PDF' or drag and drop your PDF file into the rotate area.",
      },
      {
        name: "Select Rotation",
        text: "Choose rotation angle for each page: 90°, 180°, or 270°.",
      },
      {
        name: "Rotate Pages",
        text: "Click the 'Rotate PDF' button to apply the rotation.",
      },
      {
        name: "Download",
        text: "Wait for processing, then download your rotated PDF file.",
      },
    ],
  },
  zh: {
    name: "如何旋转PDF页面",
    steps: [
      {
        name: "上传PDF",
        text: "点击'上传PDF'或拖放您的PDF文件到旋转区域。",
      },
      {
        name: "选择旋转",
        text: "为每页选择旋转角度：90°、180°或270°。",
      },
      {
        name: "旋转页面",
        text: "点击'旋转PDF'按钮应用旋转。",
      },
      {
        name: "下载",
        text: "等待处理，然后下载旋转后的PDF文件。",
      },
    ],
  },
};

export const deletePagesHowTo = {
  en: {
    name: "How to Delete Pages from PDF",
    steps: [
      {
        name: "Upload PDF",
        text: "Click 'Upload PDF' or drag and drop your PDF file into the delete area.",
      },
      {
        name: "Select Pages to Delete",
        text: "Choose the pages you want to remove from your PDF.",
      },
      {
        name: "Delete Pages",
        text: "Click the 'Delete Pages' button to remove selected pages.",
      },
      {
        name: "Download",
        text: "Wait for processing, then download your PDF without the deleted pages.",
      },
    ],
  },
  zh: {
    name: "如何从PDF中删除页面",
    steps: [
      {
        name: "上传PDF",
        text: "点击'上传PDF'或拖放您的PDF文件到删除区域。",
      },
      {
        name: "选择要删除的页面",
        text: "选择要从PDF中删除的页面。",
      },
      {
        name: "删除页面",
        text: "点击'删除页面'按钮删除选定的页面。",
      },
      {
        name: "下载",
        text: "等待处理，然后下载没有已删除页面的PDF。",
      },
    ],
  },
};

export const reorderHowTo = {
  en: {
    name: "How to Reorder PDF Pages",
    steps: [
      {
        name: "Upload PDF",
        text: "Click 'Upload PDF' or drag and drop your PDF file into the reorder area.",
      },
      {
        name: "Rearrange Pages",
        text: "Drag and drop pages to rearrange them in your desired order.",
      },
      {
        name: "Apply Changes",
        text: "Click the 'Apply' button to save the new page order.",
      },
      {
        name: "Download",
        text: "Wait for processing, then download your reordered PDF file.",
      },
    ],
  },
  zh: {
    name: "如何重新排序PDF页面",
    steps: [
      {
        name: "上传PDF",
        text: "点击'上传PDF'或拖放您的PDF文件到重新排序区域。",
      },
      {
        name: "重新排列页面",
        text: "拖放页面以按所需顺序重新排列它们。",
      },
      {
        name: "应用更改",
        text: "点击'应用'按钮保存新的页面顺序。",
      },
      {
        name: "下载",
        text: "等待处理，然后下载重新排序后的PDF文件。",
      },
    ],
  },
};

export const watermarkHowTo = {
  en: {
    name: "How to Add Watermark to PDF",
    steps: [
      {
        name: "Upload PDF",
        text: "Click 'Upload PDF' or drag and drop your PDF file into the watermark area.",
      },
      {
        name: "Enter Watermark Text",
        text: "Type the text you want to use as a watermark.",
      },
      {
        name: "Customize Appearance",
        text: "Adjust opacity, rotation, size, and position of your watermark.",
      },
      {
        name: "Add & Download",
        text: "Click 'Add Watermark' and download your watermarked PDF.",
      },
    ],
  },
  zh: {
    name: "如何为PDF添加水印",
    steps: [
      {
        name: "上传PDF",
        text: "点击'上传PDF'或拖放您的PDF文件到水印区域。",
      },
      {
        name: "输入水印文本",
        text: "输入要用作水印的文本。",
      },
      {
        name: "自定义外观",
        text: "调整水印的不透明度、旋转、大小和位置。",
      },
      {
        name: "添加并下载",
        text: "点击'添加水印'并下载添加了水印的PDF。",
      },
    ],
  },
};

export const batchHowTo = {
  en: {
    name: "How to Batch Process PDFs",
    steps: [
      {
        name: "Upload Multiple PDFs",
        text: "Click 'Upload PDFs' or drag and drop multiple PDF files into the batch area.",
      },
      {
        name: "Select Operations",
        text: "Choose the operations you want to apply: merge, split, compress, etc.",
      },
      {
        name: "Process Files",
        text: "Click the 'Process All' button to apply operations to all files.",
      },
      {
        name: "Download Results",
        text: "Wait for processing, then download your processed PDF files.",
      },
    ],
  },
  zh: {
    name: "如何批量处理PDF",
    steps: [
      {
        name: "上传多个PDF",
        text: "点击'上传PDF'或拖放多个PDF文件到批量区域。",
      },
      {
        name: "选择操作",
        text: "选择要应用的操作：合并、分割、压缩等。",
      },
      {
        name: "处理文件",
        text: "点击'处理全部'按钮对所有文件应用操作。",
      },
      {
        name: "下载结果",
        text: "等待处理，然后下载处理后的PDF文件。",
      },
    ],
  },
};

export const encryptHowTo = {
  en: {
    name: "How to Encrypt PDF Files",
    steps: [
      {
        name: "Upload PDF",
        text: "Click 'Upload PDF' or drag and drop your PDF file into the encrypt area.",
      },
      {
        name: "Set Password",
        text: "Enter a strong password to protect your PDF file.",
      },
      {
        name: "Choose Security Options",
        text: "Select permissions for printing, copying, and modifying.",
      },
      {
        name: "Encrypt & Download",
        text: "Click 'Encrypt PDF' and download your protected PDF file.",
      },
    ],
  },
  zh: {
    name: "如何加密PDF文件",
    steps: [
      {
        name: "上传PDF",
        text: "点击'上传PDF'或拖放您的PDF文件到加密区域。",
      },
      {
        name: "设置密码",
        text: "输入强密码以保护您的PDF文件。",
      },
      {
        name: "选择安全选项",
        text: "选择打印、复制和修改的权限。",
      },
      {
        name: "加密并下载",
        text: "点击'加密PDF'并下载受保护的PDF文件。",
      },
    ],
  },
};

export const decryptHowTo = {
  en: {
    name: "How to Decrypt PDF Files",
    steps: [
      {
        name: "Upload PDF",
        text: "Click 'Upload PDF' or drag and drop your password-protected PDF file.",
      },
      {
        name: "Enter Password",
        text: "Type the password that was used to protect the PDF file.",
      },
      {
        name: "Decrypt PDF",
        text: "Click the 'Decrypt PDF' button to remove password protection.",
      },
      {
        name: "Download",
        text: "Wait for processing, then download your unprotected PDF file.",
      },
    ],
  },
  zh: {
    name: "如何解密PDF文件",
    steps: [
      {
        name: "上传PDF",
        text: "点击'上传PDF'或拖放受密码保护的PDF文件。",
      },
      {
        name: "输入密码",
        text: "输入用于保护PDF文件的密码。",
      },
      {
        name: "解密PDF",
        text: "点击'解密PDF'按钮删除密码保护。",
      },
      {
        name: "下载",
        text: "等待处理，然后下载未受保护的PDF文件。",
      },
    ],
  },
};

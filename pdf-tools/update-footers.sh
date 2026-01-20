#!/bin/bash

# 批量更新所有客户端组件添加 Footer

CLIENTS=(
  "split/SplitClient"
  "extract/ExtractClient"
  "compress/CompressClient"
  "rotate/RotateClient"
  "delete-pages/DeletePagesClient"
  "reorder/ReorderClient"
  "watermark/WatermarkClient"
  "batch/BatchClient"
  "encrypt/EncryptClient"
  "decrypt/DecryptClient"
)

for client in "${CLIENTS[@]}"; do
  file="pdf-tools/app/[locale]/$client.tsx"

  if [ -f "$file" ]; then
    echo "Updating $file..."

    # 检查是否已经导入了 Footer
    if grep -q "import Footer from '@/components/Footer'" "$file"; then
      echo "  Footer already imported, skipping..."
    else
      # 在 Navbar 导入后添加 Footer 导入
      sed -i "/import Navbar from '@/\/components\/Navbar';/a import Footer from '@/\/components\/Footer';" "$file"
      echo "  Added Footer import"
    fi

    # 检查是否已经添加了 Footer 组件
    if grep -q "<Footer />" "$file"; then
      echo "  Footer component already exists, skipping..."
    else
      # 在 </main> 后添加 <Footer />
      sed -i '/<\/main>/a\\n      <Footer />' "$file"
      echo "  Added Footer component"
    fi
  else
    echo "File $file not found, skipping..."
  fi
done

echo "Done!"

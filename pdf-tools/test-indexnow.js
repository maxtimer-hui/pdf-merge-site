/**
 * IndexNow 测试脚本
 * 使用方法: node test-indexnow.js
 */

const API_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const INDEXNOW_ENDPOINT = `${API_URL}/api/indexnow`;

async function testIndexNowStatus() {
  console.log('\n🔍 测试 IndexNow API 状态...\n');

  try {
    const response = await fetch(INDEXNOW_ENDPOINT);
    const data = await response.json();

    console.log('✅ API 状态:');
    console.log(JSON.stringify(data, null, 2));

    return data;
  } catch (error) {
    console.error('❌ 获取状态失败:', error.message);
    return null;
  }
}

async function testSubmitSingleURL() {
  console.log('\n📤 测试提交单个 URL...\n');

  const testURL = `${API_URL}/en/merge`;

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: testURL
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ 提交成功:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('❌ 提交失败:');
      console.log(JSON.stringify(data, null, 2));
    }

    return data;
  } catch (error) {
    console.error('❌ 提交错误:', error.message);
    return null;
  }
}

async function testSubmitBatchURLs() {
  console.log('\n📦 测试批量提交 URL...\n');

  const testURLs = [
    `${API_URL}/en/merge`,
    `${API_URL}/zh/merge`,
    `${API_URL}/en/split`
  ];

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: testURLs
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ 批量提交成功:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('❌ 批量提交失败:');
      console.log(JSON.stringify(data, null, 2));
    }

    return data;
  } catch (error) {
    console.error('❌ 批量提交错误:', error.message);
    return null;
  }
}

async function testInvalidURL() {
  console.log('\n⚠️  测试无效 URL 处理...\n');

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: ['not-a-valid-url', `${API_URL}/en/merge`]
      })
    });

    const data = await response.json();

    console.log('响应:');
    console.log(JSON.stringify(data, null, 2));

    return data;
  } catch (error) {
    console.error('❌ 错误:', error.message);
    return null;
  }
}

async function testKeyFileAccessibility() {
  console.log('\n🔑 测试 API Key 文件可访问性...\n');

  const apiKey = process.env.INDEXNOW_API_KEY || 'e528b0165e56992a3b9cf8e98d169fa1';
  const keyFileURL = `${API_URL}/${apiKey}.txt`;

  try {
    const response = await fetch(keyFileURL);

    if (response.ok) {
      const content = await response.text();
      console.log(`✅ Key 文件可访问: ${keyFileURL}`);
      console.log(`内容: ${content.trim()}`);

      if (content.trim() === apiKey) {
        console.log('✅ Key 内容正确');
      } else {
        console.log('❌ Key 内容不匹配');
      }
    } else {
      console.log(`❌ Key 文件不可访问 (HTTP ${response.status})`);
      console.log('请确保 public 目录下存在对应的 .txt 文件');
    }
  } catch (error) {
    console.error('❌ 无法访问 Key 文件:', error.message);
  }
}

// 运行所有测试
async function runAllTests() {
  console.log('========================================');
  console.log('IndexNow API 集成测试');
  console.log('========================================');
  console.log(`API 端点: ${INDEXNOW_ENDPOINT}`);
  console.log(`网站 URL: ${API_URL}`);
  console.log('========================================');

  await testIndexNowStatus();
  await testKeyFileAccessibility();
  await testSubmitSingleURL();
  await testSubmitBatchURLs();
  await testInvalidURL();

  console.log('\n========================================');
  console.log('测试完成');
  console.log('========================================\n');
}

// 如果直接运行此脚本
if (require.main === module) {
  runAllTests();
}

module.exports = {
  testIndexNowStatus,
  testSubmitSingleURL,
  testSubmitBatchURLs,
  testInvalidURL,
  testKeyFileAccessibility,
  runAllTests
};

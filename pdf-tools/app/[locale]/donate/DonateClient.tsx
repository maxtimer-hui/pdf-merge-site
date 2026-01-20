'use client';

import { useState, use, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// 声明 PayPal 全局对象类型
declare global {
  interface Window {
    paypal?: any;
  }
}

export default function DonateClient({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const t = useTranslations('donate');
  const tc = useTranslations('common');

  const [amount, setAmount] = useState<string>('5');
  const [selectedPreset, setSelectedPreset] = useState<string>('5');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkLoadError, setSdkLoadError] = useState(false);

  const paypalContainerRef = useRef<HTMLDivElement>(null);

  // 动态加载 PayPal SDK
  useEffect(() => {
    if (window.paypal) {
      setSdkReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      console.log('PayPal SDK loaded successfully');
      setSdkReady(true);
    };
    script.onerror = () => {
      console.error('Failed to load PayPal SDK');
      setSdkLoadError(true);
    };
    document.body.appendChild(script);

    return () => {};
  }, []);

  // 渲染 PayPal 按钮
  useEffect(() => {
    if (!sdkReady || !window.paypal || paymentStatus !== 'idle') {
      return;
    }

    const container = paypalContainerRef.current;
    if (!container) return;

    // 清空容器并重新渲染按钮
    try {
      // 清空之前的按钮
      container.innerHTML = '';

      window.paypal.Buttons({
        createOrder,
        onApprove,
        onError,
        onCancel, // 添加取消回调
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
      }).render(container);
    } catch (error) {
      console.error('Error rendering PayPal button:', error);
    }
  }, [sdkReady, paymentStatus, amount]); // 添加 amount 依赖,金额改变时重新渲染

  const presetAmounts = [
    { value: '1', label: '$1' },
    { value: '5', label: '$5' },
    { value: '10', label: '$10' },
    { value: '20', label: '$20' },
  ];

  const handlePresetClick = (value: string) => {
    setAmount(value);
    setSelectedPreset(value);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    setSelectedPreset('');
  };

  // PayPal 按钮配置
  const createOrder = (data: any, actions: any) => {
    console.log('Creating PayPal order with amount:', amount);
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: amount,
          currency_code: 'USD',
        },
      }],
    }).then((orderID: string) => {
      console.log('PayPal order created:', orderID);
      return orderID;
    }).catch((err: any) => {
      console.error('Error creating PayPal order:', err);
      throw err;
    });
  };

  const onApprove = async (data: any, actions: any) => {
    console.log('Payment approved, orderID:', data.orderID);
    setPaymentStatus('processing');
    try {
      // 捕获支付
      const details = await actions.order.capture(data.orderID);
      console.log('Payment captured:', details);

      if (details.status === 'COMPLETED') {
        setPaymentStatus('success');
        console.log('✅ Payment successful!', details);
      } else {
        console.error('Payment not completed, status:', details.status);
        setPaymentStatus('error');
        setErrorMessage(t('paymentFailed'));
      }
    } catch (error: any) {
      console.error('Payment capture error:', error);

      // 判断是否是用户取消支付
      if (error.message?.includes('Window closed') || error.message?.includes('closed')) {
        console.log('User cancelled payment');
        setPaymentStatus('idle');
        // 不显示错误信息,只是重置状态
        return;
      }

      setPaymentStatus('error');
      setErrorMessage(t('paymentError'));
    }
  };

  const onError = (err: any) => {
    console.error('PayPal button error:', err);

    // 如果是用户取消,不显示错误
    if (err?.message?.includes('Window closed') || err?.message?.includes('closed')) {
      console.log('User closed PayPal window');
      setPaymentStatus('idle');
      return;
    }

    setPaymentStatus('error');
    setErrorMessage(t('paymentError'));
  };

  // 添加 onCancel 回调
  const onCancel = (data: any) => {
    console.log('Payment cancelled by user:', data);
    setPaymentStatus('idle');
  };

  const resetPayment = () => {
    setPaymentStatus('idle');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar currentLocale={locale} />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* 返回首页链接 */}
          <Link
            href={`/${locale}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {tc('backToHome')}
          </Link>

          {/* 标题 */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
              💛
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
            <p className="text-lg text-gray-600">{t('description')}</p>
          </div>

          {/* 捐赠卡片 */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {paymentStatus === 'idle' && (
              <>
                {/* 说明文字 */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 text-sm">{t('info')}</p>
                </div>

                {/* 预设金额 */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-3">
                    {t('selectAmount')}
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset.value}
                        onClick={() => handlePresetClick(preset.value)}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                          selectedPreset === preset.value
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 自定义金额 */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-3">
                    {t('customAmount')}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
                      $
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={handleCustomAmountChange}
                      min="0.01"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{t('minimumAmount', { amount: '0.01' })}</p>
                </div>

                {/* PayPal 按钮 */}
                <div className="mt-6">
                  <div className="text-center text-gray-600 mb-4">
                    {t('securePayment')}
                  </div>
                  <div ref={paypalContainerRef} className="paypal-buttons min-h-[100px]">
                    {sdkLoadError ? (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <p className="text-yellow-800 mb-2">⚠️ {t('paymentError')}</p>
                        <p className="text-sm text-yellow-700">PayPal SDK 加载失败，请稍后再试或使用其他方式捐赠</p>
                      </div>
                    ) : !sdkReady && (
                      <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="text-gray-500 mb-2">{t('loading')}</p>
                        <div className="animate-pulse">⏳</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* PayPal 说明 */}
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>{t('paypalInfo')}</p>
                </div>
              </>
            )}

            {/* 支付成功 */}
            {paymentStatus === 'success' && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('thankYou')}</h2>
                <p className="text-gray-600 mb-6">{t('thankYouMessage', { amount: `$${amount}` })}</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800">{t('successMessage')}</p>
                </div>
                <button
                  onClick={resetPayment}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  {t('donateAgain')}
                </button>
              </div>
            )}

            {/* 支付错误 */}
            {paymentStatus === 'error' && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">❌</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('paymentFailed')}</h2>
                <p className="text-red-600 mb-6">{errorMessage}</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={resetPayment}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    {t('tryAgain')}
                  </button>
                  <Link
                    href={`/${locale}`}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    {tc('backToHome')}
                  </Link>
                </div>
              </div>
            )}

            {/* 处理中 */}
            {paymentStatus === 'processing' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-spin">⏳</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('processing')}</h2>
                <p className="text-gray-600">{t('processingMessage')}</p>
              </div>
            )}
          </div>

          {/* FAQ */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t('faq.title')}</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">{t('faq.q1.question')}</h4>
                <p className="text-gray-600 text-sm">{t('faq.q1.answer')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">{t('faq.q2.question')}</h4>
                <p className="text-gray-600 text-sm">{t('faq.q2.answer')}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">{t('faq.q3.question')}</h4>
                <p className="text-gray-600 text-sm">{t('faq.q3.answer')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

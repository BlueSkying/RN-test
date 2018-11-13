package com.awesomeproject;

import android.app.Application;

import com.facebook.react.ReactApplication;
import cn.reactnative.modules.update.UpdatePackage;
import cn.reactnative.modules.update.UpdateContext;
import com.rnfs.RNFSPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import org.lovebing.reactnative.baidumap.BaiduMapPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.theweflex.react.WeChatPackage;
import com.rusel.RCTBluetoothSerial.RCTBluetoothSerialPackage;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    @Override
    protected String getJSBundleFile(){
      return UpdateContext.getBundleUrl(MainApplication.this);
    }
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new UpdatePackage(),
            new RNFSPackage(),
            new RNViewShotPackage(),
            new BaiduMapPackage(getApplicationContext()),
            new SplashScreenReactPackage(),
            new WeChatPackage(),
            new RCTBluetoothSerialPackage(),
            new RNCameraPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}

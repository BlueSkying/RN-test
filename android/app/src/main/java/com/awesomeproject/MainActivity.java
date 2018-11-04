package com.awesomeproject;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.Window;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected void onCreate(Bundle savedInstancestate){
        SplashScreen.show(this,true);
        super.onCreate(savedInstancestate);
    }
    @Override
    protected String getMainComponentName() {
        return "AwesomeProject";
    }
}

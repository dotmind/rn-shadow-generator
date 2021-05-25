package com.shadowexampleapp;

import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.drawable.Drawable;
import android.graphics.drawable.LayerDrawable;
import android.graphics.drawable.ShapeDrawable;
import android.graphics.drawable.shapes.RoundRectShape;
import android.view.Gravity;
import android.view.View;

import androidx.annotation.ColorInt;
import androidx.annotation.ColorRes;
import androidx.annotation.DimenRes;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.annotations.ReactPropGroup;
import com.facebook.react.views.view.ReactViewGroup;


public class AndroidShadowViewManager extends ViewGroupManager<NativeLinearLayout> {
    public static final String REACT_CLASS = "AndroidCustomShadowView";
    ReactApplicationContext mCallerContext;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    public AndroidShadowViewManager(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;
    }

    @Override
    public NativeLinearLayout createViewInstance(ThemedReactContext context) {
        return new NativeLinearLayout(context);
    }

    @ReactProp(name = "direction")
    public void setAndroidShadowElevation(NativeLinearLayout view, float elevation) {
        view.setElevation(elevation);
    }
}
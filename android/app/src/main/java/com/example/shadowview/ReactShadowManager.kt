package com.example.shadowview

import android.graphics.Paint
import android.graphics.Rect
import android.graphics.drawable.Drawable
import android.graphics.drawable.LayerDrawable
import android.graphics.drawable.ShapeDrawable
import android.graphics.drawable.shapes.RoundRectShape
import android.view.Gravity.*
import android.view.View
import androidx.annotation.ColorRes
import androidx.annotation.DimenRes
import androidx.core.content.ContextCompat
import com.facebook.react.ReactRootView
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.*
import com.facebook.react.views.view.ReactViewGroup
import com.facebook.react.views.view.ReactViewManager

class ReactShadowManager : ViewManager<ReactViewGroup, ReactShadowNode>() {
    var backgroundColor: String = null
    var elevation: Int = null
    var shadowColor: String = null
    var direction: String = null

    override fun createViewInstance(reactContext: ThemedReactContext?): ReactViewGroup? {
        val view = ReactViewGroup(reactContext);
        view.setBackground(generateBackgroundWithShadow(ReactRootView(reactContext), ))
        return view
    }

    override fun getName(): String = "ShadowView"

    @ReactProp(name="level")
    fun setLevel(view: ReactRootView, newLevel: Int) {
        elevation = newLevel
    }

    @ReactProp(name="shadowColor")
    fun setShadowColor(view: ReactRootView, newShadowColor: String) {
        shadowColor = newShadowColor
    }

    @ReactProp(name="direction")
    fun setDirection(view: ReactRootView, newDirection: String) {
        direction = newDirection
    }

    fun generateBackgroundWithShadow(
        view: View,
        @DimenRes cornerRadius: Int,
        @ColorRes shadowColor: Int,
        shadowGravity: Int
    ): Drawable {
        val cornerRadiusValue: Float = view.context.resources.getDimension(cornerRadius)
        val elevationValue = view.context.resources.getDimension(elevation).toInt()
        val shadowColorValue = ContextCompat.getColor(view.context,shadowColor)
        val backgroundColorValue = ContextCompat.getColor(view.context,backgroundColor)

        val outerRadius = floatArrayOf(
            cornerRadiusValue, cornerRadiusValue, cornerRadiusValue,
            cornerRadiusValue, cornerRadiusValue, cornerRadiusValue, cornerRadiusValue,
            cornerRadiusValue
        )

        val backgroundPaint = Paint()
        backgroundPaint.setStyle(Paint.Style.FILL);
        backgroundPaint.setShadowLayer(cornerRadiusValue, 0, 0, 0);

        val shapeDrawablePadding: Rect = Rect()
        shapeDrawablePadding.left = elevationValue;
        shapeDrawablePadding.right = elevationValue;

        var DY: Int = 0

        when (shadowGravity) {
            CENTER -> {
                shapeDrawablePadding.top = elevationValue
                shapeDrawablePadding.bottom = elevationValue
                DY = 0
            }
            TOP -> {
                shapeDrawablePadding.top = elevationValue*2;
                shapeDrawablePadding.bottom = elevationValue;
                DY = -1*elevationValue/3;
            }
            BOTTOM -> {
                shapeDrawablePadding.top = elevationValue;
                shapeDrawablePadding.bottom = elevationValue*2;
                DY = elevationValue/3;
            }
        }

        val shapeDrawable: ShapeDrawable = ShapeDrawable()
        shapeDrawable.setPadding(shapeDrawablePadding)

        shapeDrawable.getPaint().setColor(backgroundColorValue);
        shapeDrawable.getPaint().setShadowLayer((cornerRadiusValue/3).toFloat(),
            0F, DY.toFloat(), shadowColorValue);

        view.setLayerType(View.LAYER_TYPE_SOFTWARE, shapeDrawable.getPaint());

        shapeDrawable.setShape(RoundRectShape(outerRadius, null, null));

        val drawable =
            LayerDrawable(arrayOf<Drawable>(shapeDrawable))
        drawable.setLayerInset(0, elevationValue, elevationValue*2, elevationValue, elevationValue*2);

        return drawable;

    }

    override fun updateExtraData(root: ReactViewGroup?, extraData: Any?) {
        TODO("Not yet implemented")
    }

    override fun createShadowNodeInstance(): ReactShadowNode {
        TODO("Not yet implemented")
    }

    override fun getShadowNodeClass(): Class<out ReactShadowNode> {
        TODO("Not yet implemented")
    }
}

package com.xapphire13.images

import com.xapphire13.extensions.getNormalizedName
import com.xapphire13.models.Challenge
import java.awt.Color
import java.awt.Dimension
import java.awt.Font
import java.awt.Graphics2D
import java.awt.font.TextAttribute
import java.awt.image.BufferedImage

private fun Graphics2D.drawLines(lines: List<String>, x: Int, y: Int, canvasDimension: Dimension) {
    var currentY = y
    val lineHeight = fontMetrics.height

    lines.forEach { line ->
        var currentX = x
        val tokens = line.split(" ")

        tokens.forEachIndexed { i, token ->
            val width = fontMetrics.stringWidth(token)
            if (canvasDimension.width - currentX - width < 0) {
                currentX = x
                currentY += lineHeight
                drawString(token, currentX, currentY)
                currentX += width
            } else {
                val drawSpace = i > 0
                drawString(if (drawSpace) " $token" else token, currentX, currentY)
                currentX += width + if (drawSpace) fontMetrics.stringWidth(" ") else 0
            }
        }

        currentY += lineHeight
    }
}

private const val PADDING = 8

fun generateLinkPreview(challenge: Challenge): BufferedImage {
    val img = BufferedImage(400, 200, BufferedImage.TYPE_INT_RGB)

    val baseFont: Font =
        Font.createFont(
            Font.TRUETYPE_FONT,
            object {}::class.java.classLoader.getResourceAsStream("Offside-Regular.ttf")
        )
    val appFont = baseFont.deriveFont(32f)
    val bigFont = appFont.deriveFont(40f)
    val underlined = bigFont.deriveFont(
        mapOf(
            TextAttribute.UNDERLINE to TextAttribute.UNDERLINE_ON
        )
    )
    val gutterFont = appFont.deriveFont(22f)

    img.createGraphics().apply {
        val appFontLineHeight = getFontMetrics(appFont).height
        val gutterFontLineHeight = getFontMetrics(gutterFont).height

        val gutterSize = gutterFontLineHeight + 2 * PADDING

        color = Color(0x3F, 0x3F, 0x59)
        fillRect(0, 0, img.width, img.height)

        font = appFont
        color = Color.WHITE
        drawLines(
            listOf(
                "Today's challenge is",
            ), PADDING, PADDING + fontMetrics.ascent, Dimension(img.width - PADDING, img.height - gutterSize - PADDING)
        )
        font = underlined
        color = Color(0xFB, 0xAA, 0xC8)
        drawLines(
            listOf(
                challenge.getNormalizedName()
            ),
            PADDING,
            PADDING + appFontLineHeight + fontMetrics.ascent,
            Dimension(img.width - PADDING, img.height - gutterSize - PADDING)
        )
        color = Color.WHITE
        font = bigFont
        drawLines(
            listOf(
                challenge.getNormalizedName()
            ),
            PADDING,
            PADDING + appFontLineHeight + fontMetrics.ascent,
            Dimension(img.width - PADDING, img.height - gutterSize - PADDING)
        )

        font = gutterFont
        color = Color(0xF6, 0x10, 0x67)
        drawLine(0, img.height - gutterSize, img.width, img.height - gutterSize)
        color = Color.WHITE
        drawString("#dailyPhotoChallenge", PADDING, img.height - PADDING - fontMetrics.descent)

        dispose()
    }

    return img
}
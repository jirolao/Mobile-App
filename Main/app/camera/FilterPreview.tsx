import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Surface } from "gl-react-expo";
import { Shaders, Node, GLSL } from "gl-react";
import Slider from "@react-native-community/slider";
import { useRouter, useLocalSearchParams } from "expo-router";

const shaders = Shaders.create({
  grayscale: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D t;
      uniform float filterAmount;
      void main () {
        vec4 color = texture2D(t, uv);
        float gray = dot(color.rgb, vec3(0.3, 0.59, 0.11));
        gl_FragColor = vec4(mix(color.rgb, vec3(gray), filterAmount), color.a);
      }
    `,
  },
  sepia: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D t;
      uniform float filterAmount;
      void main () {
        vec4 color = texture2D(t, uv);
        vec3 sepia = vec3(
          dot(color.rgb, vec3(0.393, 0.769, 0.189)),
          dot(color.rgb, vec3(0.349, 0.686, 0.168)),
          dot(color.rgb, vec3(0.272, 0.534, 0.131))
        );
        gl_FragColor = vec4(mix(color.rgb, sepia, filterAmount), color.a);
      }
    `,
  },
});

function Grayscale({ children, filterAmount }: any) {
  return (
    <Node
      shader={shaders.grayscale}
      uniforms={{ t: children, filterAmount }}
    />
  );
}

function Sepia({ children, filterAmount }: any) {
  return (
    <Node
      shader={shaders.sepia}
      uniforms={{ t: children, filterAmount }}
    />
  );
}

export default function FilterPreview() {
  const router = useRouter();
  const params = useLocalSearchParams<{ uri: string }>();
  const photoUri = params.uri;
  const [filter, setFilter] = useState<"none" | "grayscale" | "sepia">("none");
  const [intensity, setIntensity] = useState(1);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {filter === "grayscale" ? (
          <Surface style={styles.img} width={320} height={180}>
            <Grayscale filterAmount={intensity}>
              {{ uri: photoUri }}
            </Grayscale>
          </Surface>
        ) : filter === "sepia" ? (
          <Surface style={styles.img} width={320} height={180}>
            <Sepia filterAmount={intensity}>
              {{ uri: photoUri }}
            </Sepia>
          </Surface>
        ) : (
          <Image source={{ uri: photoUri }} style={styles.img} />
        )}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 12 }}>
        <TouchableOpacity onPress={() => setFilter("none")} style={styles.filterBtn}>
          <Text style={{ color: filter === "none" ? "#1DB954" : "#fff" }}>None</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter("grayscale")} style={styles.filterBtn}>
          <Text style={{ color: filter === "grayscale" ? "#1DB954" : "#fff" }}>Grayscale</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter("sepia")} style={styles.filterBtn}>
          <Text style={{ color: filter === "sepia" ? "#1DB954" : "#fff" }}>Sepia</Text>
        </TouchableOpacity>
      </View>
      {filter !== "none" && (
        <View style={styles.sliderWrap}>
          <Text style={{ color: "#fff", marginBottom: 6 }}>Filter Intensity</Text>
          <Slider
            minimumValue={0}
            maximumValue={1}
            step={0.01}
            value={intensity}
            onValueChange={setIntensity}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#fff"
            style={{ width: 240 }}
          />
        </View>
      )}
      <View style={{ flexDirection: "row", justifyContent: "space-around", margin: 24 }}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() =>
            router.push({
              pathname: "/camera/EditTools",
              params: { uri: photoUri },
            })
          }
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={() => router.back()}>
          <Text style={{ color: "#fff" }}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: { width: 320, height: 180, borderRadius: 12, backgroundColor: "#222" },
  filterBtn: {
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: "#232323",
    borderRadius: 7,
    marginBottom: 6,
  },
  sliderWrap: {
    alignItems: "center",
    marginBottom: 8,
  },
  actionBtn: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 36,
    paddingVertical: 10,
    borderRadius: 30,
  },
});

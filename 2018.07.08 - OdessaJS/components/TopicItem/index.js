/* @flow */

import * as React from "react";
import Font from "components/Font";
import Link from "components/Link";
import TopicFollowButton from "components/TopicFollowButton";
import TopicImage from "components/TopicImage";
import classNames from "classNames";
import paths from "paths";
import styles from "./styles.css";
import type { TopicItemFragament as Topic } from "graphql/schema.js";

type Props = {
  topic: Topic,
  className?: string
};

export default function TopicItem({ topic, className }: Props) {
  return (
    <div className={className(styles.item, className)}>
      <Link to={paths.topics.show(topic)} className={styles.image}>
        <TopicImage topic={topic} size={50} />
      </Link>

      <Link to={paths.topics.show(topic)} className={styles.info}>
        <Font.Title>{topic.name}</Font.Title>
        <Font.SilentText>{topic.description}</Font.SilentText>
      </Link>

      <TopicFollowButton topic={topic} />
    </div>
  );
}

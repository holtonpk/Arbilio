import React, { useCallback, useEffect, useRef, useState } from "react";

interface ScrollBarProps {
  tableRef: any;
  scrollContainerRef: any;
  heightRef: any;
  headerHeightRef: any;
  buttonContainerRef: any;
  showScrollBar: any;
  setShowScrollbar: any;
}

const ScrollBar = ({
  tableRef,
  scrollContainerRef,
  heightRef,
  headerHeightRef,
  buttonContainerRef,
  showScrollBar,
  setShowScrollbar,
}: ScrollBarProps) => {
  const scrollBarRef = useRef<HTMLSpanElement | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);

  const updateScrollBarPosition = useCallback(() => {
    const tableElement = tableRef.current;
    if (!tableElement || !scrollBarRef.current || !scrollTrackRef.current)
      return;

    const scrollMax = tableElement.scrollWidth - tableElement.clientWidth;
    const scrollPercent = tableElement.scrollLeft / scrollMax;
    const scrollTrackArea =
      scrollTrackRef.current.clientWidth - scrollBarRef.current.clientWidth;
    const scrollBarLeft = scrollPercent * scrollTrackArea;

    scrollBarRef.current.style.left = `${scrollBarLeft}px`;
  }, [tableRef]);

  const updateScrollBarVisibility = useCallback(() => {
    const tableElement = tableRef.current;
    if (!tableElement) return;

    const scrollable = tableElement.scrollWidth > tableElement.clientWidth;
    setShowScrollbar(scrollable);
  }, [tableRef, setShowScrollbar]);

  const updateScrollBarWidth = useCallback(() => {
    const tableElement = tableRef.current;
    if (!tableElement || !scrollBarRef.current || !scrollTrackRef.current)
      return;

    const scrollTrackArea = scrollTrackRef.current.clientWidth;
    const scrollBarWidth =
      (tableElement.clientWidth / tableElement.scrollWidth) * scrollTrackArea;

    scrollBarRef.current.style.width = `${scrollBarWidth}px`;
  }, [tableRef]);

  useEffect(() => {
    updateScrollBarWidth();
    const handleResize = () => {
      updateScrollBarWidth();
      updateScrollBarVisibility();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateScrollBarWidth, updateScrollBarVisibility]);

  useEffect(() => {
    updateScrollBarVisibility();
  }, [tableRef, updateScrollBarVisibility]);

  useEffect(() => {
    const tableElement = tableRef.current;
    if (!tableElement) return;
    tableElement.addEventListener("scroll", updateScrollBarPosition);
    return () => {
      tableElement.removeEventListener("scroll", updateScrollBarPosition);
    };
  }, [updateScrollBarPosition, tableRef]);

  useEffect(() => {
    if (scrollContainerRef.current && scrollTrackRef.current) {
      scrollTrackRef.current.style.top = `${scrollContainerRef.current.offsetTop}px`;
    }
  }, [scrollContainerRef, scrollTrackRef, showScrollBar]);

  useEffect(() => {
    if (
      headerHeightRef.current &&
      heightRef.current &&
      buttonContainerRef.current
    ) {
      if (
        scrollContainerRef.current &&
        scrollContainerRef.current.clientHeight != 0
      ) {
        buttonContainerRef.current.style.top = `${
          headerHeightRef.current.clientHeight +
          scrollContainerRef.current.clientHeight
        }px`;
      } else {
        buttonContainerRef.current.style.top = `${headerHeightRef.current.clientHeight}px`;
      }
    }
  }, [
    headerHeightRef,
    heightRef,
    scrollContainerRef,
    buttonContainerRef,
    showScrollBar,
  ]);

  return (
    <>
      {showScrollBar && (
        <div
          ref={scrollTrackRef}
          className="w-full  absolute bg-background h-[16px] items-center flex z-30 top-0 overflow-hidden px-2"
        >
          <span className="w-full bg-transparent dark:bg-secondary rounded-md h-2 overflow-hidden relative">
            <span
              ref={scrollBarRef}
              className="w-[40%] left-0 absolute rounded-md top-1/2 -translate-y-1/2 bg-accent  h-2"
            />
          </span>
        </div>
      )}
    </>
  );
};

export default ScrollBar;

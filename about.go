package main

import (
	"strings"

	"github.com/charmbracelet/lipgloss"
)

type Tool struct {
	Name string
	URL  string
}

type Section struct {
	Title string
	Tools []Tool
}

var toolsList = []Section{
	{
		Title: "Languages",
		Tools: []Tool{
			{Name: "C++", URL: "https://isocpp.org/"},
			{Name: "Python", URL: "https://www.python.org/"},
			{Name: "Java", URL: "https://www.java.com/"},
		},
	},
	{
		Title: "Frameworks & Libraries",
		Tools: []Tool{
			{Name: "PyTorch", URL: "https://pytorch.org/"},
			{Name: "Scikit-learn", URL: "https://scikit-learn.org/"},
			{Name: "Pandas", URL: "https://pandas.pydata.org/"},
			{Name: "NumPy", URL: "https://numpy.org/"},
			{Name: "Matplotlib", URL: "https://matplotlib.org/"},
			{Name: "Seaborn", URL: "https://seaborn.pydata.org/"},
		},
	},
	{
		Title: "Tools & Platforms",
		Tools: []Tool{
			{Name: "Git", URL: "https://git-scm.com/"},
			{Name: "GitHub", URL: "https://github.com/"},
			{Name: "Hugging Face", URL: "https://huggingface.co/"},
			{Name: "PostgreSQL", URL: "https://www.postgresql.org/"},
			{Name: "Jupyter Notebook", URL: "https://jupyter.org/"},
			{Name: "LaTeX", URL: "https://www.latex-project.org/"},
		},
	},
}

func getAboutView(m Model, width, height int) string {
	aboutStyle := m.renderer.NewStyle().
		Width(width).
		Height(height)

	boldStyle := m.renderer.NewStyle().
		Foreground(m.theme.primary).
		Bold(true)

	usableHeight := height - 2
	usableWidth := width - 6

	aboutText := boldStyle.Render("# About Me") + `

I’m a Computer Science student who’s driven by the idea of creating things that matter whether that means tools used by many people or projects that make life a little better for someone out there. For me, technology is more than just code; it’s a way to be both creative and useful, and to make the most of my limited time by pushing for better conditions through what I build.

Outside of tech, I’m fascinated by the beauty of creation in different forms—photography, origami, even woodworking (though I’ve only admired it from afar). These interests remind me that building something meaningful can start from the simplest materials, whether it’s paper, wood, or lines of code.`

	var toolsSections []string

	var toolStyle = m.renderer.NewStyle().
		Border(lipgloss.RoundedBorder()).
		Padding(0, 1).MarginRight(1)

	for _, section := range toolsList {
		var tools []string
		for _, tool := range section.Tools {
			tools = append(tools, toolStyle.Render(createHyperlink(tool.URL, tool.Name)))
		}
		toolsSections = append(toolsSections, "## "+section.Title+"\n"+wrapAndJoin(tools, usableWidth)+"\n")
	}

	aboutText += "\n\n\n" + boldStyle.Render("# Tools & Technologies") + "\n\n" +
		lipgloss.JoinVertical(lipgloss.Left, toolsSections...)

	aboutContent := m.renderer.NewStyle().
		Width(usableWidth).
		Height(usableHeight).
		Render(aboutText)

	totalLines := lipgloss.Height(aboutContent)
	scrollViewTotalLines = totalLines
	scrollViewUsableHeight = usableHeight
	if totalLines > usableHeight {
		aboutContentLines := strings.Split(aboutContent, "\n")
		startLine := m.scrollOffset
		endLine := min(int(startLine)+usableHeight, totalLines)
		aboutContent = strings.Join(aboutContentLines[startLine:endLine], "\n")
	}

	topStyle := m.renderer.NewStyle().
		Width(usableWidth).
		Height(1).
		Align(lipgloss.Center)

	bottomStyle := m.renderer.NewStyle().
		Width(usableWidth).
		Height(1).
		Align(lipgloss.Center)

	top := ""
	bottom := ""

	if m.scrollOffset != 0 {
		top = topStyle.Render("⌃")
	}
	if m.scrollOffset+usableHeight < totalLines {
		bottom = bottomStyle.Render("⌄")
	}
	return aboutStyle.Render(lipgloss.Place(
		width, height,
		lipgloss.Center, lipgloss.Center,
		top+"\n"+aboutContent+"\n"+bottom,
	))
}

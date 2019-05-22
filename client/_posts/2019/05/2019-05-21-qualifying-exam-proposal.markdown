---
layout: single_post
title:  "Qualifying Exam Proposal"
date:   2019-05-22 08:57:00 -0500
categories: science
author: Michael Porter
description: My qualifying exam proposal
---

This is my qualifying exam proposal for the Molecular Biophysics program at UT Southwestern. I passed the oral defense and I wanted to put this out here because I think there are some good ideas here. This proposal is not my thesis work, but these are topics I'm interested in.

I'm not so sure I like aim 1 anymore, but aims 2 & 3 are pretty good ideas in my opinion, and I especially like aim 3.

**Improved Methods for Identifying Post-Translational Modifications From
Proteomics Data**

**Michael Porter**

**Lab: Hamid Mirzaei**

**Molecular Biophysics Program**

**Qualifying Exam**

**May 2019**


***I. Specific Aims***

Post-translational modifications (PTM) are key to the lifecycle of
nearly every protein in the human proteome. Signaling, localization,
interactions, conformation, and degradation are modulated by PTMs, and
dysregulation of PTMs are implicated in many diseases. Mass
spectrometry-based proteomics is the tool of choice for PTM detection
due to its high-throughput and high mass accuracy. However, to manage
the balance between feasible search spaces and comprehensive PTM
identification, current identification software restricts itself to a
small subset of PTMs. Although modern mass spectrometers collect tens to
hundreds of thousands of spectra, only a small fraction result in usable
sequence information. A large proportion of unidentified spectra do
correlate to modified peptide sequences, but current proteomics software
is poorly suited to efficiently processing these spectra.

The enormous number of potential proteoforms due to PTMs turns a fully
comprehensive search into a computationally intractable problem. Recent
software advances are beginning to enable routine, all-inclusive PTM
analyses, but these methods suffer from sensitivity, speed, and accuracy
issues. Currently, a major obstacle in the field is the lack of software
which can search through the astronomical number of proteoforms while
maintaining the speed and accuracy of traditional search software.

To solve this problem, we will develop new software which uses new
sources of input data and new technologies to rapidly and efficiently
perform a comprehensive search. We will merge two alternative search
strategies, cascading and open searches, and use our hybrid approach
with a novel database method to greatly expand the number of searchable
proteoforms. We expect that our search method will minimize the number
of unidentified spectra and lead to better sequence coverage. We also
propose to incorporate isotopic information during the validation step
which will help discriminate between low-scoring, yet true matches, and
higher-scoring false matches. With our improved methods, comprehensive
PTM profiling will become more reliable and more routine which will in
turn provide more mechanistic insight into how disease states are
regulated.

Aim 1 will create a new hybrid approach for sequence database matching.
Two different methods have been developed to help address the problem of
large, comprehensive search spaces. One approach, the cascading search,
successively generates matches with different subsets of proteoforms to
help manage the FDR. The other method, the open search, allows for an
arbitrary number of proteoforms within a predefined tolerance. The
cascading search is not as comprehensive as the open search, but the
open search requires vast computational resources and time. We will
merge the two approaches with a preliminary cascading search to reduce
the dataset and then perform an open search on any remaining spectra.
Running the open search on this smaller subset of data will reduce the
amount of time required to comprehensively search the data.

Aim 2 will generate an offline and reusable peptide sequence database.
The first step of a sequence database search is to generate all possible
peptide sequences given a list of proteins and a set of parameters. This
step is costly both in terms of computer memory and processing time as
the number of considered PTMs increases. To circumvent this issue, we
will create a relational database schema that provides immediate access
to an organism’s entire proteoform, including all PTMs. This database
will be search engine agnostic and will allow the search software to
query the database rather than generate its own database for each
search. Besides the increase in search space with a reduction in memory
use, this database will also be amenable to use with distributed, high
performance computing.

Aim 3 will establish a method using isotopic information to better
distinguish between true and false positives. Because the scoring
schemes used by sequence database search software are arbitrary, the
correctness of a peptide identification is determined by simultaneously
searching non-existent protein sequences and establishing a false
discovery rate (FDR) cutoff based on the score distributions of real vs
fake sequences. However, this method does not use all information
available about each spectrum. We will incorporate information about
each peptide’s isotopic envelope to help rescue correct identifications
that may have scored lower than decoy sequences.

The proposed software will establish new search methods which will
overcome current limitations and increase the number of peptide
identifications from mass spectrometry data. Minimizing the number of
unidentified spectra will increase sequence coverage in proteomics
experiments and help routinely identify sequence features that have
previously not been feasible to search for on a large scale. This will
improve our ability to discover biomarkers and will provide additional
insight into the mechanisms behind previously difficult to cure
diseases.

***II. Research Strategy***

**A. Background**

***Mass spectrometry-based proteomics***

Mass spectrometry (MS) is the de facto method of choice for
proteomics(1). In a typical proteomics analysis, a complex mixture of
proteins is enzymatically digested, and the resulting peptides are
separated via high performance liquid chromatography (HPLC). The outlet
of the HPLC is coupled to the mass spectrometer where the separated
peptides are ionized before being introduced to the mass spectrometer.

Once an ion enters the mass spectrometer, an initial scan, known as an
MS1 scan, is collected (Fig 1A). The MS1 scan contains information about
a peptide’s mass-to-charge ratio (m/z) and its intensity. Due to natural
variations in the distributions of light and heavy isotopes, each
peptide appears not as a single peak, but rather as a series of peaks
known as the isotopic envelope. The spacing between the peaks is related
to the charge on the peptide and can be used to calculate the peptide’s
neutral mass.

As the MS1 scans are collected, the mass spectrometer is watching for
peaks. As a peak appears (Fig 1B), the mass spectrometer will isolate
that m/z and fragment it, commonly with an inert gas. The m/z that was
selected for fragmentation is known as the precursor. The fragments are
then introduced to the mass analyzer and a scan known as a tandem MS/MS,
or MS2, scan is collected. Peptides fragment at predictable locations
along the backbone and create ladders of peaks. The spacing between the
peaks can then be used to identify the sequence of the peptide (Fig 1C).

![Figure showing MS1 and MS2 scans](/images/qual/QualFig1.jpg "MS1 and MS2 scans")

***Figure 1*** A single MS1 scan spanning from 400 m/z to 1200 m/z is
displayed in A. The red rectangle denotes the region shown in B, which
is the same scan as in A, but zoomed in on the region from 910 to 960
m/z. The red rectangle in B indicates the range selected for
fragmentation. In C, we see the MS2 scan corresponding to the region
highlighted in B. The peaks used for the identification are marked in
red. The ions marked as ‘b’ are fragments which contain the N-terminus,
and which split at a peptide bond. The ‘y’ ions also fragmented at the
peptide bond and contain the C-terminus. The numbering refers to the
number of residues contained in each fragment.

***Peptide Identification***

After the instrument finishes data collection, the peptide sequences are
inferred by the search software. Sequences can be determined via de novo
methods(2), short sequence tags(3), spectral libraries(4), or via a
sequence database search(5). De novo methods attempt to reconstruct the
peptide sequence using only the spacing between the peaks found in the
MS2 scans. While in theory this method can produce the correct sequence,
in practice it is much more difficult due to missing peaks and
background peaks. The sequence tag approach uses a de novo style
approach, but rather than try to sequence the entire peptide it searches
for short sequence tags, often three amino acids in length, and then
matches those tags back to a database of protein sequences. This method
was among the first capable of interpreting MS2 spectra, but it still
required a degree of effort after the tags were generated to then
produce the correct peptide sequence for the spectrum. Spectral library
searches compare the observed spectra to a library of previously
observed and identified spectra. While this method is extremely fast and
accurate, it relies on a previous observation and identification of each
peptide of interest, although new advances are allowing spectral library
searches to take into account arbitrary modifications as well(6).

The sequence database search is today the dominant method for generating
sequences from fragmentation data. During this step, the sequence
database - typically reference proteomes from a source such as Uniprot
or from RNAseq data - is provided to the search software. The protein
sequences are then digested and fragmented in silico for comparison with
the MS2 data. Each MS2 spectrum, in addition to the fragment masses,
carries information about the m/z of the precursor and the charge state
of the precursor. This information is used to select only those peptides
from the database which fall within a predetermined mass tolerance. For
example, if we have a spectrum from a precursor of m/z 500 and charge
2+, that gives us a precursor neutral mass of 998 Da. Using a tolerance
of 20 ppm, the search software would take any peptide from our database
which has a mass between 997.98 and 998.02 to compare with the spectrum.
The theoretical fragments are compared with the observed fragments and a
score is generated. Many different scoring schemes exist, and all are
arbitrary; there is no ground truth on how to score a peptide match.

***Peptide Validation***

To assess the correctness of the matches, a decoy database is typically
generated and added to the target sequences. The decoy database is
generated most commonly by randomly shuffling the target sequences, or
more simply by reversing the sequences. The peptide matches are deemed
to be either true positives or false positives based on the score
distributions of the target and decoy sequences. In a perfect world, the
target sequences would all have high scores and the decoy sequences
would all have low scores. However, the scores of the decoy sequences
typically overlap with those of the target sequences so a cutoff must be
determined. The primary methods of doing this are to calculate a false
discovery rate using the target and decoy sequences(7) or to use
Bayesian statistics to calculate the cutoff(8).

***Post-translational modifications***

A post-translational modification is a chemical modification made to a
specific amino acid. There are hundreds of different known modifications
spanning the entire proteome. Post-translational modifications have been
implicated in several diseases. The aggregation of tau in Alzhiemer’s
disease and other forms of neurodegeneration is suspected to be driven
by PTMs(9). Several PTMs usually omitted from typical proteomics
analyses are mis-regulated in cancer(10). Moving beyond just disease,
histone modifications play an important role in gene regulation(11) and
phosphorylation is critical for cellular signaling cascades(12).

**B. Significance**

Although modern mass spectrometers collect tens to hundreds of thousands
of MS2 scans, only a fraction of those spectra result in usable peptide
IDs; current sequence database search software reliably generates IDs
for fewer than half of the spectra. That number is further reduced once
the FDR is calculated and the true positives are separated from the
false positives. Even in a high performing example with a 63% ID rate,
44,829 MS2 scans will result in only 16,338 peptides representing 3,410
proteins, a small fraction of the proteome. Traditional search software
only accounts for at most a handful of PTMs, a limitation stemming from
the inability to efficiently include all PTMs in the search(5). This
leads to many unidentified spectra, incorrect identifications, and a
restricted view of the data due to the omitted PTMs. To account for
these sources of error, the FDR in proteomics was developed(7) to lend
confidence to the results derived from the search software.

One of the major issues with the traditional target-decoy FDR approach
is that of score competition from the decoys(13). The lower scoring, yet
still correct, true positives are at increased risk of being outscored
by a false positive decoy sequence. This leads to an underestimation of
the number of true positives. Additionally, a cutoff score is selected
so that the FDR is less than or equal to a predetermined value,
typically 1%. While simple to calculate, this approach yields no
information as to the probability that a given identification is
correct. While a Bayesian approach to the validation can compute a
probability, the issue of score competition remains. The validation step
is only as good as the data feeding into it, yet the data feeding into
the validation step is derived from the search engine rather than from
the original spectra. The loss of true positives in the scoring and
validation steps is one contributor to missing IDs.

In addition to the scoring and validation steps, another source of
missing data comes from the limitations of the database used for
searching. Recently, a mass-tolerant search revealed that many of the
unidentified spectra do correspond to modified peptides that weren’t
included in the initial search(14). Estimates of the size of all human
proteoforms puts the number at up to 6.13 million protein species(15).
Each of those proteins produces on average about 50 peptides during the
digestion step which further increases the search space. Searching such
a large space is non-trivial and is still an area of active research.

**C. Innovation**

I propose several methods to reduce the number of unidentified spectra
and increase the coverage of PTMs using a new scoring and validation
method along with new strategies for handling the immense search space
of the full, modified proteome. Peptide sequence database search
programs completely discount the MS1 spectra, with the exception of the
precursor m/z, during the search process. Incorporating the isotopic
envelope will provide additional metrics that will help distinguish
between true and false positives. I will also combine two search
strategies to more efficiently and effectively search through the
enormous number of PTM-derived proteoforms without incurring the lost
sensitivity that current methods suffer from. I will also develop an
efficient way to query all suspected proteoforms in a way that is
amenable to distributed computing or real-time searching.

***III. Approach***

**Aim 1: Develop a cascading/open hybrid search pipeline.**

***Rationale:***

The predominant strategy for identifying peptides from mass spectrometry
data uses a strategy known as sequence database searching. While this
strategy provides quick, accurate results, it is limited by the large
number of potential proteoforms. A proteoform is all the different
molecular forms a protein may take. These different forms can arise due
to alternative splicing, non-synonymous mutations, or post-translational
modifications (PTMs). Although there are only an estimated \~20,000
genes in the human genome, known post translational modifications (PTMs)
and single amino acid variants (SAVs) put the estimated number of human
proteoforms in the range of 0.5 to 6 million. Considering the
proteolytic digestion that accompanies shotgun proteomics gives us
between 25 and 300 million different potential peptides that can appear
in a proteomics experiment. Furthermore, only a fraction of PTMs have
been characterized which leads us to the realization that the search
space far exceeds our computational capacity. To address this issue, the
earliest search engines restricted their search to a subset of the
proteome by ignoring modifications(5). In the years since, the hardware
and software have improved to the point that it is routine to include a
handful of PTMs during the search. However, the inclusion of each
additional PTM drastically increases the search space and search time.

To circumvent the issue of exploding search space, several different
methods have been developed. These methods include the use of sequence
tags(16), mass-tolerant searches(14), indexing methods(17), and de novo
generated tags(18). To date, these methods have shown that at least one
third of all unidentified spectra belong to modified peptides(14), and
in some cases can triple the number of identifications made(18).
However, these methods suffer from long search times, poor sensitivity,
or a large upfront investment in de novo sequencing.

In work unrelated to the open searching method, a cascading search(19)
was used to help solve the issue of sensitivity loss. As more and more
PTMs are included, the sensitivity of the search goes down because each
spectrum can match to a larger list of candidate sequences. To prevent
this from happening, a cascading search first searches against a
database of unmodified peptides. Any spectra which did not receive a
good match are then subjected to subsequent searches in which additional
PTMs are considered in each round of searches. This method helps
maintain good sensitivity in the search.

***Strategy and methods:***

My strategy will consist of combining the cascading search with the open
search paradigm. We will initially search our spectra against a simple,
base database. Sample preparation often introduces modifications to the
peptides, so the first cascade will take those modifications into
account rather than running an initial unmodified search. A large
proportion of peptides are expected to be identified in this initial
step. The spectra will then be split up into spectra with confident
identifications and spectra with low-confidence identifications. The
low-confidence spectra will then be re-searched, but this time some
common PTMs will be included. This process will continue over several
rounds, with additional PTMs being considered in each round. At the end
of the cascade, the remaining spectra will be subjected to an open
search.

One of the big issues with performing an open search is the loss of
sensitivity. By increasing the mass-tolerance on an open search, a lower
percentage of the original IDs are returned by the software(14). By
instead performing the cascading search, my method will return all the
IDs expected by a traditional database search and result in fewer false
positives.

Another advantage to the hybrid approach will be reduced search times. A
typical database search can be completed in a matter of minutes, while
an open search can take hours or days. This limitation is one of the
contributors to the lack of comprehensive PTM profiling. By removing the
low-hanging fruit with a traditional search, the open search can be
focused on the spectra which do contain unknown PTMs. This hybrid method
is compatible with any of the existing open search strategies.

***Potential pitfalls and alternative approaches:***

One pitfall will be in reliably determining a scoring cutoff to decide
which spectra have confident matches and which spectra should be
searched in the next round. The scores are dependent on the instrument
and general quality of data of that acquisition, so some sort of
adaptable metric will need to be implemented. It may be as simple as the
FDR cutoff or Bayesian method.

Another pitfall will be compiling all the data and computing peptide
probabilities. The original cascade method developed a new FDR
calculation to account for the different groups of IDs, but some open
search methods utilize methods other than the FDR to discriminate
between good and bad matches. Developing a statistically sound and
correct validation scheme may be the biggest challenge of combining the
cascading and open search strategies.

Another alternative is to use the identifications made in the first
search to seed the PTM containing searches. This strategy is already
implemented by X! TANDEM(20) which performs an initial search of the
spectra and then a refined search. During the refined search, the
software takes only the proteins identified during the initial search
and adds additional PTMs that weren’t considered before. The rationale
behind this refinement step is that searching for PTMs on identified
proteins is a more efficient use of time than blindly searching for
those modifications on all proteins. Unfortunately, this refinement step
on its own does little to reduce the number of unidentified spectra.
However, it could be a useful strategy in setting up the multiple
cascades of my hybrid search strategy.

**Aim 2: Design and implement a high availability peptide database.**

***Rationale:***

Perhaps the main driver behind the open search concept is the
inefficiency and impracticality of generating the many millions of
potentially modified peptides each time a search is run. Each search
engine regenerates all the candidate peptide sequences each time it is
run. Some search engines will create indices to speed up the process on
subsequent runs, but there remains the repeated step of database
generation and loading. Additionally, these indices are not shared among
search engines. A common strategy to increase the number and confidence
of peptide IDs is to utilize several different search engines with
different scoring schemes. However, each search engine must recompute
the peptide database for each spectrum file that it searches. While this
is not an issue for restricted searches, it becomes an issue once many
PTMs are under included in the search.

While repeated database generation is an inefficient process, there are
several reasons why it is done. The first is to free up memory on the
computer when the search is done. It is not practical for each search
engine to keep the database in memory in between searches. The second
reason is that changing the allowed PTMs requires the peptide database
to be updated. A typical search might not include many PTMs, but a
phosphoproteomics search would need to include phosphorylation of
serine, threonine, and tyrosine as variable modifications. This results
in two different peptide databases, one with phosphorylation and one
without. Generating the peptide database on the fly permits the search
software more flexibility in changing the search parameters for each
search.

***Strategy and methods:***

My strategy is to adopt database methods used by modern technology
companies to generate a universal and highly available database. I
propose to generate a database schema to store all possible modified
peptides in a SQL database which can then be queried by the various
peptide sequence database search engines.

Web search engines already use a similar strategy. When keywords are
typed into the search bar, the search engine does not start searching
through all possible web pages to find matching sites. Instead, the
search engine has previously indexed all the web pages it is aware of
and simply uses the keywords to lookup the relevant sites in the
database. The database is generated once and is updated with new
information as it comes in. My peptide database would work in much the
same way.

Rather than generate theoretical peptides on the fly, my approach will
take an organism’s proteome, generate all the theoretical peptides -
including all potential PTMs and any desired amino acid variants - and
save the sequence information to a database. This approach provides
several advantages. First, we save time with each search. Rather than
starting each search by generating the same information time after time,
we simply need to start reading the spectra and query the database for
the candidate sequences within our mass tolerance.

Second, we can allow an arbitrary number of types of PTM without needing
to worry about our computer’s memory requirements. During the database
generation step, we can allow all potential modifications on our
peptides. Since our database can be housed on a separate, high capacity
server, we do not need to worry about the requirements of the computer
running the search. The search program can optionally include the
modifications it wants to consider when it queries the database to limit
its search space like a traditional search, or it can permit all
modifications like an open search. Each searching step will potentially
take longer because there are more candidate sequences to match against,
but we will still be saving time by skipping the time-consuming step of
database generation each time.

Third, it will be easier to distribute the workload on a
high-performance computing (HPC) system. As mass spectrometers increase
in speed, more and more scans are collected. Analyses consisting of
hundreds of gigabytes up to terabytes of data are becoming more and more
common. By utilizing a centralized database, it will be easier to
distribute this workload on an HPC system because only the individual
spectra will need to be sent to each thread.

Fourth, we can now perform a normal database search, but still capture
all the identifications that an open search would give. Personal
experience with some of the open search programs shows that a database
search with PTMs is more accurate than an open search with arbitrary
modifications. By performing this new form of database search, more PTMs
should be accurately identified than with an open search.

Fifth, my database approach would allow real-time, comprehensive PTM
mapping. Recent work demonstrated the feasibility of identifying spectra
as they are acquired by the instrument(21). The real-time
identifications were used to help tune instrument performance and
complete the acquisition in half the time. This is especially important
in a clinical setting in which rapid results may be needed. An example
of this would be during a surgical procedure in which mass spectrometry
has already proven useful as a tool in tumor identification(22).
Comprehensive real-time searching would also be a boon to mass
spectrometry imaging(23) which suffers from long acquisition times.
Feedback from the identifications could lead to optimized imaging
protocols which adjust to the sample.

***Potential pitfalls and alternative approaches:***

One potential pitfall might be consistent and rapid access to the
database. Databases such as those in use by Google are high performance
and capable of handling and returning many queries simultaneously. Such
hardware may not be available to all researchers or labs, so such large
peptide databases may be impractical; the bottleneck in this case would
be the capabilities of the server housing the database. Alternatively, a
database constructed with a smaller subset of PTMs would be more
performant while still providing a larger search space than is possible
using traditional methods on a typical desktop computer.

Another issue with a search involving so many PTMs is the same as with
an open search – decreased sensitivity. A traditional search may have to
compare a list of a few hundred candidate sequences against each
spectrum; considering all possible PTMs will invariably increase the
size of the candidate list to at least the thousands. New scoring
criteria may need to be employed to help discriminate between true and
false matches.

Another pitfall could be the rate of adoption. Most existing peptide
search engines are developed in siloed environments and many do not even
support existing standard file formats, opting instead for their own
formats. A major obstacle would be convincing the creators/maintainers
of each search engine to add in support for such a database.

**Aim 3: Use isotopic information to better distinguish between true and
false identifications.**

***Rationale:***

Establishing the false discovery rate (FDR) is critical to obtaining
reliable results from shotgun proteomics. Sequence database search
engines will attempt to provide a match for every spectrum collected by
the instrument, but incorrect matches can arise due to the following
reasons: 1) the search space does not include all peptides present in
the sample; 2) non-peptide species are present in the sample; 3)
incorrect sequences can potentially outscore correct sequences; and 4)
the spectra are too low quality for a good match to be made. Each search
engine uses an arbitrary scoring scheme, so to determine which matches
are incorrect, the FDR was developed(7) to provide a measure of
confidence for the matches.

Prior to performing the search, the target sequences are either shuffled
or reversed and then appended to the target database. This concatenated
database is now used for the peptide sequence matching. After all
matching is complete, the identifications are sorted by score and a
score cutoff is chosen such that the FDR is less than or equal to a
predefined value, typically 1% (Fig 2). There are also alternative
methods to the score cutoff method which utilize Bayesian statistics to
discriminate between correct and incorrect matches(8) on a per spectrum
level, but both methods use scoring information as the basis of the
determination between correct and incorrect matches.

![An example target/decoy score distribution](images/qual/QualFig2.jpg "An example target/decoy score distribution")

***Figure 2*** An example target vs decoy score distribution. The
vertical line marks a score of 45, the demarcation of a 1% FDR. Scores
higher than 45 are retained while lower scoring matches are discarded.
The poor separation between target and decoy scores leads to
approximately 30% of the target sequence matches being discarded. The
search engine used for these IDs was MSGF+.

The advantage of the Bayesian method for discriminating between correct
and incorrect matches is that it can utilize additional sources of
information beyond just the search engine score. However, this
discrimination step typically only uses derived or inferred information
about the peptide rather than primary information. For example, this
discriminatory step will use the search engine score and the number of
enzymatic termini, both of which pieces of data are derived from the
identification step. Typically, the only primary source of information
from the match is how well the theoretical m/z matches the observed m/z.
I propose in this work to incorporate the complete isotopic envelope to
help discriminate between correct and incorrect matches. This approach
will be most useful in helping rescue correct matches which have been
out competed by higher scoring decoy matches. This will in theory help
separate the decoy distribution from the target distribution, resulting
in a higher percentage of retained correct matches.

***Strategy and methods:***

Peptide sequence database search engines only utilize MS2 spectra during
the identification process. However, there is a wealth of information
contained in the MS1 spectra. As shown previously(24), each isotopic
envelope of four peaks contains seven additional metrics: four abundance
measurements and three mass defect measurements. My strategy for
rescuing the out-competed correct matches will consist of taking the
matches for each spectrum and comparing their theoretical isotopic
envelope to that of the observed spectrum.

![An MS1 spectrum illustrating an isotopic envelope](images/qual/QualFig3.jpg "An MS1 spectrum illustrating an isotopic envelope")

***Figure 3*** An isotopic envelope illustrating the seven available
metrics. There are four intensity measures, I0 through I4, and three
mass difference measures, Δ1 through Δ3. The mass differences differ
from peptide to peptide depending on the elemental composition. These
differences arise from the mass defect, mass lost as the binding energy
required in creating heavy isotopes.

During the identification process, peptide sequence database search
engines match a list of candidate sequences to each spectrum. The
candidate sequences are selected by filtering the database for any
peptides that fall within a predefined mass tolerance which is dependent
on the instrument settings during data acquisition. The highest scoring
peptide is reported as the correct match for the spectrum, but each
search engine is capable of outputting a list of the top matches in
addition to the highest scoring match.

After scoring, but prior to validation, my method will take the list of
peptide identifications and extract their isotopic envelopes from the
MS1 scans. Each peptide identification will have its isotopic envelope
calculated and compared to the observed isotopic envelope. Several
methods exist for calculating isotopic envelopes with high
precision(25,26) and have been used previously to great effect in
analyzing observed isotopic envelopes(24). As the score of each match
decreases, the likelihood of a high scoring 2<sup>nd</sup> or 3<sup>rd</sup> match
increases which indicates score competition. By matching the isotopic
envelopes, I will be able to discriminate between false positives that
out-scored true positives and select the true positive as the correct ID
rather than the decoy sequence. This will help increase the separation
between the target and decoy scores and improve the number of IDs which
pass our validation, whether with a traditional FDR cutoff or with the
Bayesian approach.

***Potential pitfalls and alternative approaches:***

One potential pitfall of this approach is that of degeneracy in the
elemental compositions of the peptides. Isotopic envelopes are
calculated based on elemental composition; it is possible to have two
distinct peptide sequences which have the same elemental composition. In
these cases, it will not be possible to use the isotopic envelope to
distinguish between true and false positives. Additionally, there may be
situations in which the elemental compositions are too similar for the
isotopic envelopes to be differentiated within the accuracy of the
instrument.

One alternative approach would be to construct a decoy database that
still mimics real peptides, but at the same time ensures that there is
enough difference in their elemental compositions to be distinguishable
from target sequences. This will require some validation to ensure that
the synthesized decoy database still performs comparably to a
traditional shuffled or reversed decoy database. Another alternative
approach would be to extract all the isotopic envelopes and incorporate
them into the Bayesian approach.

In addition to the isotopic envelope, there are several other primary
pieces of information which could prove useful in discriminating between
correct and incorrect matches. The mass spectrometer collects
information, or the information can be calculated, about the retention
time, injection time, and resolution (just to name a few) that could
potentially help discriminate between correct and incorrect matches. New
validation methods, potentially involving machine learning, may be
required to successfully integrate all these various sources of
information.

***IV. Conclusions***

One of the limitations of proteomics is in reliably and routinely
identifying post-translational modifications. Effectively searching
through the large volume of data generated by modern mass spectrometers
is a major obstacle to profiling PTMs. My proposed methods will take
existing ideas and methods and apply them to making proteomics analyses
more efficient. The data contained in MS1 scans are a vastly
underutilized resource, despite the wealth of information contained
therein. Additionally, the many improvements in open searching still
face issues with speed and sensitivity. By taking ideas from the field
itself as well as from other industries, these methods will help move
the field forward and more comprehensively profile the proteome. Many
diseases, especially those caused by aberrant signaling, will remain
uncurable until we are able to comprehensively profile the PTMs involved
in those processes.

***Literature Cited***

\(1) Aebersold, R.; Mann, M. Mass Spectrometry-Based Proteomics. *Nature*
**2003**, *422* (6928), 198–207. https://doi.org/10.1038/nature01511.

\(2) Dancík, V.; Addona, T. A.; Clauser, K. R.; Vath, J. E.; Pevzner, P.
A. De Novo Peptide Sequencing via Tandem Mass Spectrometry. *J. Comput.
Biol. J. Comput. Mol. Cell Biol.* **1999**, *6* (3–4), 327–342.
https://doi.org/10.1089/106652799318300.

\(3) Mann, M.; Wilm, M. Error-Tolerant Identification of Peptides in
Sequence Databases by Peptide Sequence Tags. *Anal. Chem.* **1994**,
*66* (24), 4390–4399.

\(4) Lam, H.; Deutsch, E. W.; Eddes, J. S.; Eng, J. K.; King, N.; Stein,
S. E.; Aebersold, R. Development and Validation of a Spectral Library
Searching Method for Peptide Identification from MS/MS. *Proteomics*
**2007**, *7* (5), 655–667. https://doi.org/10.1002/pmic.200600625.

\(5) Eng, J. K.; McCormack, A. L.; Yates, J. R. An Approach to Correlate
Tandem Mass Spectral Data of Peptides with Amino Acid Sequences in a
Protein Database. *J. Am. Soc. Mass Spectrom.* **1994**, *5* (11),
976–989. https://doi.org/10.1016/1044-0305(94)80016-2.

\(6) Bittremieux, W.; Meysman, P.; Noble, W. S.; Laukens, K. Fast Open
Modification Spectral Library Searching through Approximate Nearest
Neighbor Indexing. *J. Proteome Res.* **2018**, *17* (10), 3463–3474.
https://doi.org/10.1021/acs.jproteome.8b00359.

\(7) Elias, J. E.; Gygi, S. P. Target-Decoy Search Strategy for Mass
Spectrometry-Based Proteomics. *Methods Mol. Biol. Clifton NJ* **2010**,
*604*, 55–71. https://doi.org/10.1007/978-1-60761-444-9\_5.

\(8) Keller, A.; Nesvizhskii, A. I.; Kolker, E.; Aebersold, R. Empirical
Statistical Model to Estimate the Accuracy of Peptide Identifications
Made by MS/MS and Database Search. *Anal. Chem.* **2002**, *74* (20),
5383–5392.

\(9) Martin, L.; Latypova, X.; Terro, F. Post-Translational Modifications
of Tau Protein: Implications for Alzheimer’s Disease. *Neurochem. Int.*
**2011**, *58* (4), 458–471.
https://doi.org/10.1016/j.neuint.2010.12.023.

\(10) Sahab, Z. J.; Kirilyuk, A.; Zhang, L.; Khamis, Z. I.; Pompach, P.;
Sung, Y.; Byers, S. W. Analysis of Tubulin Alpha-1A/1B C-Terminal Tail
Post-Translational Poly-Glutamylation Reveals Novel Modification Sites.
*J. Proteome Res.* **2012**, *11* (3), 1913–1923.
https://doi.org/10.1021/pr2011044.

\(11) Bannister, A. J.; Kouzarides, T. Regulation of Chromatin by Histone
Modifications. *Cell Res.* **2011**, *21* (3), 381–395.
https://doi.org/10.1038/cr.2011.22.

\(12) Li, X.; Wilmanns, M.; Thornton, J.; Köhn, M. Elucidating Human
Phosphatase-Substrate Networks. *Sci. Signal.* **2013**, *6* (275),
rs10. https://doi.org/10.1126/scisignal.2003203.

\(13) Nesvizhskii, A. I. A Survey of Computational Methods and Error Rate
Estimation Procedures for Peptide and Protein Identification in Shotgun
Proteomics. *J. Proteomics* **2010**, *73* (11), 2092–2123.
https://doi.org/10.1016/j.jprot.2010.08.009.

\(14) Chick, J. M.; Kolippakkam, D.; Nusinow, D. P.; Zhai, B.; Rad, R.;
Huttlin, E. L.; Gygi, S. P. A Mass-Tolerant Database Search Identifies a
Large Proportion of Unassigned Spectra in Shotgun Proteomics as Modified
Peptides. *Nat. Biotechnol.* **2015**, *33* (7), 743–749.
https://doi.org/10.1038/nbt.3267.

\(15) Ponomarenko, E. A.; Poverennaya, E. V.; Ilgisonis, E. V.;
Pyatnitskiy, M. A.; Kopylov, A. T.; Zgoda, V. G.; Lisitsa, A. V.;
Archakov, A. I. The Size of the Human Proteome: The Width and Depth.
*Int. J. Anal. Chem.* **2016**, *2016*, 7436849.
https://doi.org/10.1155/2016/7436849.

\(16) Na, S.; Bandeira, N.; Paek, E. Fast Multi-Blind Modification Search
through Tandem Mass Spectrometry. *Mol. Cell. Proteomics MCP* **2012**,
*11* (4), M111.010199. https://doi.org/10.1074/mcp.M111.010199.

\(17) Kong, A. T.; Leprevost, F. V.; Avtonomov, D. M.; Mellacheruvu, D.;
Nesvizhskii, A. I. MSFragger: Ultrafast and Comprehensive Peptide
Identification in Mass Spectrometry–Based Proteomics. *Nat. Methods*
**2017**, *14* (5), 513–520. https://doi.org/10.1038/nmeth.4256.

\(18) Devabhaktuni, A.; Lin, S.; Zhang, L.; Swaminathan, K.; Gonzalez, C.
G.; Olsson, N.; Pearlman, S. M.; Rawson, K.; Elias, J. E. TagGraph
Reveals Vast Protein Modification Landscapes from Large Tandem Mass
Spectrometry Datasets. *Nat. Biotechnol.* **2019**, *37* (4), 469–479.
https://doi.org/10.1038/s41587-019-0067-5.

\(19) Kertesz-Farkas, A.; Keich, U.; Noble, W. S. Tandem Mass Spectrum
Identification via Cascaded Search. *J. Proteome Res.* **2015**, *14*
(8), 3027–3038. https://doi.org/10.1021/pr501173s.

\(20) Craig, R.; Beavis, R. C. A Method for Reducing the Time Required to
Match Protein Sequences with Tandem Mass Spectra. *Rapid Commun. Mass
Spectrom. RCM* **2003**, *17* (20), 2310–2316.
https://doi.org/10.1002/rcm.1198.

\(21) Erickson, B. K.; Mintseris, J.; Schweppe, D. K.; Navarrete-Perea,
J.; Erickson, A. R.; Nusinow, D. P.; Paulo, J. A.; Gygi, S. P. Active
Instrument Engagement Combined with a Real-Time Database Search for
Improved Performance of Sample Multiplexing Workflows. *J. Proteome
Res.* **2019**, *18* (3), 1299–1306.
https://doi.org/10.1021/acs.jproteome.8b00899.

\(22) Zhang, J.; Rector, J.; Lin, J. Q.; Young, J. H.; Sans, M.; Katta,
N.; Giese, N.; Yu, W.; Nagi, C.; Suliburk, J.; et al. Nondestructive
Tissue Analysis for Ex Vivo and in Vivo Cancer Diagnosis Using a
Handheld Mass Spectrometry System. *Sci. Transl. Med.* **2017**, *9*
(406), eaan3968. https://doi.org/10.1126/scitranslmed.aan3968.

\(23) Takats, Z. Mass Spectrometry Sampling Under Ambient Conditions with
Desorption Electrospray Ionization. *Science* **2004**, *306* (5695),
471–473. https://doi.org/10.1126/science.1104404.

\(24) Naylor, B. C.; Porter, M. T.; Wilson, E.; Herring, A.; Lofthouse,
S.; Hannemann, A.; Piccolo, S. R.; Rockwood, A. L.; Price, J. C.
DeuteRater: A Tool for Quantifying Peptide Isotope Precision and Kinetic
Proteomics. *Bioinforma. Oxf. Engl.* **2017**, *33* (10), 1514–1520.
https://doi.org/10.1093/bioinformatics/btx009.

\(25) Dittwald, P.; Claesen, J.; Burzykowski, T.; Valkenborg, D.; Gambin,
A. BRAIN: A Universal Tool for High-Throughput Calculations of the
Isotopic Distribution for Mass Spectrometry. *Anal. Chem.* **2013**,
*85* (4), 1991–1994. https://doi.org/10.1021/ac303439m.

\(26) Rockwood, A. L.; Haimi, P. Efficient Calculation of Accurate Masses
of Isotopic Peaks. *J. Am. Soc. Mass Spectrom.* **2006**, *17* (3),
415–419. https://doi.org/10.1016/j.jasms.2005.12.001.
